import { randomUUID } from "node:crypto";
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import type { User, Page, Block, FileAsset } from "./database.js";

const DATA_DIR = join(process.cwd(), "data");
const USERS_FILE = join(DATA_DIR, "users.json");
const PAGES_FILE = join(DATA_DIR, "pages.json");
const BLOCKS_FILE = join(DATA_DIR, "blocks.json");
const FILES_FILE = join(DATA_DIR, "files.json");

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
  try {
    writeFileSync(file, JSON.stringify(data, null, 2), "utf-8");
  } catch (error) {
    console.error(`Failed to save ${file}:`, error);
  }
}

export class FileDatabase {
  private _users: Map<string, User>;
  private _pages: Map<string, Page>;
  private _blocks: Map<string, Block>;
  private _files: Map<string, FileAsset>;

  constructor() {
    const usersData = loadJson<Record<string, User>>(USERS_FILE, {});
    const pagesData = loadJson<Record<string, Page>>(PAGES_FILE, {});
    const blocksData = loadJson<Record<string, Block>>(BLOCKS_FILE, {});
    const filesData = loadJson<Record<string, FileAsset>>(FILES_FILE, {});

    this._users = new Map(Object.entries(usersData));
    this._pages = new Map(Object.entries(pagesData));
    this._blocks = new Map(Object.entries(blocksData));
    this._files = new Map(Object.entries(filesData));
  }

  private save() {
    saveJson(USERS_FILE, Object.fromEntries(this._users));
    saveJson(PAGES_FILE, Object.fromEntries(this._pages));
    saveJson(BLOCKS_FILE, Object.fromEntries(this._blocks));
    saveJson(FILES_FILE, Object.fromEntries(this._files));
  }

  get users() {
    return this._users;
  }

  get pages() {
    return this._pages;
  }

  get blocks() {
    return this._blocks;
  }

  get files() {
    return this._files;
  }

  findUserByEmail(email: string) {
    return [...this._users.values()].find((user) => user.email === email);
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

    this._users.set(id, user);
    this._pages.set(personalPageId, page);

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
    this._pages.set(id, page);
    this.save();
    return page;
  }

  getPageTree(rootPageId: string, userId: string): { id: string; title: string; icon?: string; children: Array<{ id: string; title: string; icon?: string; children: any[] }> } {
    const rootPage = this._pages.get(rootPageId);
    if (!rootPage || !rootPage.collaborators.includes(userId)) {
      throw new Error("PAGE_NOT_FOUND_OR_NO_ACCESS");
    }

    const buildTree = (pageId: string): { id: string; title: string; icon?: string; children: Array<{ id: string; title: string; icon?: string; children: any[] }> } => {
      const page = this._pages.get(pageId);
      if (!page) {
        throw new Error("PAGE_NOT_FOUND");
      }

      const children: Array<{ id: string; title: string; icon?: string; children: any[] }> = page.childPageIds
        .map((childId) => {
          const child = this._pages.get(childId);
          if (!child || !child.collaborators.includes(userId)) {
            return null;
          }
          return buildTree(childId);
        })
        .filter((node): node is { id: string; title: string; icon?: string; children: any[] } => node !== null)
        .sort((a, b) => {
          const aPage = this._pages.get(a.id);
          const bPage = this._pages.get(b.id);
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
    type: any;
    props: Record<string, unknown>;
    position: number;
    parentBlockId?: string;
  }): Block {
    const page = this._pages.get(pageId);
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

    this._blocks.set(block.id, block);
    page.blockIds.push(block.id);
    page.blockIds.sort((aId, bId) => {
      const a = this._blocks.get(aId);
      const b = this._blocks.get(bId);
      return (b?.position ?? 0) - (a?.position ?? 0);
    });
    page.updatedAt = new Date().toISOString();
    this.save();
    return block;
  }

  getBlocksForPage(pageId: string) {
    const page = this._pages.get(pageId);
    if (!page) {
      return [];
    }
    return page.blockIds
      .map((blockId) => this._blocks.get(blockId))
      .filter((block): block is Block => Boolean(block))
      .sort((a, b) => b.position - a.position);
  }

  serializePageWithEntries(pageId: string) {
    const page = this._pages.get(pageId);
    if (!page) {
      throw new Error("PAGE_NOT_FOUND");
    }
    const entries = this.getBlocksForPage(pageId)
      .filter((block) => block.type === "paragraph")
      .map((block) => ({
        id: block.id,
        authorId: block.createdBy,
        content: String(block.props.text ?? ""),
        createdAt: block.createdAt
      }));

    return {
      ...page,
      entries
    };
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
    };
  }
}
