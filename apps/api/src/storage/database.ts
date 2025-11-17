import { randomUUID } from "node:crypto";
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";

export type PageEntry = {
  id: string;
  authorId: string;
  content: string;
  createdAt: string;
};

export type Page = {
  id: string;
  workspaceId: string;
  title: string;
  ownerId: string;
  collaborators: string[];
  parentPageId?: string | null;
  icon?: string;
  coverUrl?: string;
  summary?: string;
  position: number;
  childPageIds: string[];
  blockIds: string[];
  createdAt: string;
  updatedAt: string;
};

export type BlockType =
  | "paragraph"
  | "heading_1"
  | "heading_2"
  | "heading_3"
  | "bulleted_list"
  | "numbered_list"
  | "todo"
  | "toggle"
  | "quote"
  | "callout"
  | "divider"
  | "file"
  | "calendar_view"
  | "task_list";

export type Block = {
  id: string;
  pageId: string;
  parentBlockId?: string;
  type: BlockType;
  props: Record<string, unknown>;
  position: number;
  createdAt: string;
  createdBy: string;
};

export type FileAsset = {
  id: string;
  workspaceId: string;
  uploaderId: string;
  storageKey: string;
  bucket: string;
  size: number;
  mimeType: string;
  title: string;
  createdAt: string;
  sharedLinkToken?: string;
  sharedLinkExpiresAt?: string;
};

export type User = {
  id: string;
  email: string;
  password: string;
  name: string;
  personalPageId: string;
};

export type PageSnapshot = Page & {
  entries: PageEntry[];
};

export type PageTreeNode = {
  id: string;
  title: string;
  icon?: string;
  children: PageTreeNode[];
};

const DATA_DIR = join(process.cwd(), "data");
const USERS_FILE = join(DATA_DIR, "users.json");
const PAGES_FILE = join(DATA_DIR, "pages.json");
const BLOCKS_FILE = join(DATA_DIR, "blocks.json");
const FILES_FILE = join(DATA_DIR, "files.json");

function ensureDataDir() {
  if (!existsSync(DATA_DIR)) {
    mkdirSync(DATA_DIR, { recursive: true });
  }
}

function loadJson<T>(file: string, defaultValue: T): T {
  if (!existsSync(file)) {
    return defaultValue;
  }
  try {
    const content = readFileSync(file, "utf-8");
    return JSON.parse(content);
  } catch {
    return defaultValue;
  }
}

function saveJson<T>(file: string, data: T) {
  ensureDataDir();
  try {
    writeFileSync(file, JSON.stringify(data, null, 2), "utf-8");
  } catch (error) {
    console.error(`Failed to save ${file}:`, error);
  }
}

class PersistentDatabase {
  users = new Map<string, User>();
  pages = new Map<string, Page>();
  blocks = new Map<string, Block>();
  files = new Map<string, FileAsset>();

  constructor() {
    this.load();
  }

  private load() {
    const usersData = loadJson<Record<string, User>>(USERS_FILE, {});
    const pagesData = loadJson<Record<string, Page>>(PAGES_FILE, {});
    const blocksData = loadJson<Record<string, Block>>(BLOCKS_FILE, {});
    const filesData = loadJson<Record<string, FileAsset>>(FILES_FILE, {});

    this.users = new Map(Object.entries(usersData));
    this.pages = new Map(Object.entries(pagesData));
    this.blocks = new Map(Object.entries(blocksData));
    this.files = new Map(Object.entries(filesData));
  }

  save() {
    saveJson(USERS_FILE, Object.fromEntries(this.users));
    saveJson(PAGES_FILE, Object.fromEntries(this.pages));
    saveJson(BLOCKS_FILE, Object.fromEntries(this.blocks));
    saveJson(FILES_FILE, Object.fromEntries(this.files));
  }

  findUserByEmail(email: string) {
    return [...this.users.values()].find((user) => user.email === email);
  }

  createUser({ email, password, name }: { email: string; password: string; name: string }) {
    if (this.findUserByEmail(email)) {
      throw new Error("USER_EXISTS");
    }

    const id = randomUUID();
    const personalPageId = randomUUID();
    const now = new Date().toISOString();

    const user: User = { id, email, password, name, personalPageId };
    const page: Page = {
      id: personalPageId,
      workspaceId: `workspace-${id}`,
      title: `${name}님의 개인 워크스페이스`,
      ownerId: id,
      collaborators: [id],
      childPageIds: [],
      blockIds: [],
      position: 0,
      createdAt: now,
      updatedAt: now
    };

    this.users.set(id, user);
    this.pages.set(personalPageId, page);

    const welcomeBlock = this.createBlock({
      pageId: personalPageId,
      authorId: id,
      type: "paragraph",
      props: { text: "환영합니다! 여기는 나만을 위한 개인 페이지입니다." },
      position: 0
    });
    page.blockIds.push(welcomeBlock.id);

    this.save();
    return { user, page: this.serializePageWithEntries(personalPageId) };
  }

  createPage({
    id,
    title,
    ownerId,
    parentPageId,
    collaborators
  }: {
    id: string;
    title: string;
    ownerId: string;
    parentPageId?: string | null;
    collaborators: string[];
  }): Page {
    const now = new Date().toISOString();
    const page: Page = {
      id,
      workspaceId: `workspace-${ownerId}`,
      title,
      ownerId,
      collaborators,
      parentPageId: parentPageId ?? null,
      childPageIds: [],
      blockIds: [],
      position: Date.now(),
      createdAt: now,
      updatedAt: now
    };
    this.pages.set(id, page);
    this.save();
    return page;
  }

  getPageTree(rootPageId: string, userId: string): PageTreeNode {
    const rootPage = this.pages.get(rootPageId);
    if (!rootPage || !rootPage.collaborators.includes(userId)) {
      throw new Error("PAGE_NOT_FOUND_OR_NO_ACCESS");
    }

    const buildTree = (pageId: string): PageTreeNode => {
      const page = this.pages.get(pageId);
      if (!page) {
        throw new Error("PAGE_NOT_FOUND");
      }

      const children = page.childPageIds
        .map((childId) => {
          const child = this.pages.get(childId);
          if (!child || !child.collaborators.includes(userId)) {
            return null;
          }
          return buildTree(childId);
        })
        .filter((node): node is PageTreeNode => node !== null)
        .sort((a, b) => {
          const aPage = this.pages.get(a.id);
          const bPage = this.pages.get(b.id);
          return (bPage?.position ?? 0) - (aPage?.position ?? 0);
        });

      return {
        id: page.id,
        title: page.title,
        icon: page.icon,
        children
      };
    };

    return buildTree(rootPageId);
  }

  createBlock({
    pageId,
    authorId,
    type,
    props,
    position,
    parentBlockId
  }: {
    pageId: string;
    authorId: string;
    type: BlockType;
    props: Record<string, unknown>;
    position: number;
    parentBlockId?: string;
  }): Block {
    const page = this.pages.get(pageId);
    if (!page) {
      throw new Error("PAGE_NOT_FOUND");
    }

    const block: Block = {
      id: randomUUID(),
      pageId,
      parentBlockId,
      type,
      props,
      position,
      createdAt: new Date().toISOString(),
      createdBy: authorId
    };

    this.blocks.set(block.id, block);
    page.blockIds.push(block.id);
    page.blockIds.sort((aId, bId) => {
      const a = this.blocks.get(aId);
      const b = this.blocks.get(bId);
      return (b?.position ?? 0) - (a?.position ?? 0);
    });
    page.updatedAt = new Date().toISOString();
    this.save();
    return block;
  }

  getBlocksForPage(pageId: string) {
    const page = this.pages.get(pageId);
    if (!page) {
      return [];
    }
    return page.blockIds
      .map((blockId) => this.blocks.get(blockId))
      .filter((block): block is Block => Boolean(block))
      .sort((a, b) => b.position - a.position);
  }

  serializePageWithEntries(pageId: string): PageSnapshot {
    const page = this.pages.get(pageId);
    if (!page) {
      throw new Error("PAGE_NOT_FOUND");
    }
    
    try {
      const blocks = this.getBlocksForPage(pageId);
      const entries: PageEntry[] = blocks
        .filter((block) => block && block.type === "paragraph")
        .map((block) => ({
          id: block.id,
          authorId: block.createdBy || "",
          content: String(block.props?.text ?? ""),
          createdAt: block.createdAt || new Date().toISOString()
        }));

      return {
        ...page,
        entries
      };
    } catch (error) {
      console.error("Error serializing page with entries:", pageId, error);
      // 에러가 발생해도 빈 entries로 반환
      return {
        ...page,
        entries: []
      };
    }
  }

  addTextEntry(pageId: string, authorId: string, content: string) {
    const block = this.createBlock({
      pageId,
      authorId,
      type: "paragraph",
      props: { text: content },
      position: Date.now()
    });

    return {
      id: block.id,
      authorId: block.createdBy,
      content,
      createdAt: block.createdAt
    } satisfies PageEntry;
  }
}

export const db = new PersistentDatabase();
