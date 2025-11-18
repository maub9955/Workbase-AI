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
  teamIds?: string[];
};

export type Team = {
  id: string;
  name: string;
  description?: string;
  ownerId: string;
  memberIds: string[];
  createdAt: string;
  updatedAt: string;
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

// 환경 변수로 데이터 디렉토리 설정 가능 (Render Persistent Disk 사용 시)
const DATA_DIR = process.env.DATA_DIR || join(process.cwd(), "data");
const USERS_FILE = join(DATA_DIR, "users.json");
const PAGES_FILE = join(DATA_DIR, "pages.json");
const BLOCKS_FILE = join(DATA_DIR, "blocks.json");
const FILES_FILE = join(DATA_DIR, "files.json");
const TEAMS_FILE = join(DATA_DIR, "teams.json");

function ensureDataDir() {
  if (!existsSync(DATA_DIR)) {
    try {
      mkdirSync(DATA_DIR, { recursive: true });
      console.log(`[Database] 데이터 디렉토리 생성: ${DATA_DIR}`);
    } catch (error) {
      console.error(`[Database] 데이터 디렉토리 생성 실패: ${DATA_DIR}`, error);
      throw error;
    }
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
    const jsonString = JSON.stringify(data, null, 2);
    writeFileSync(file, jsonString, "utf-8");
    console.log(`[Database] 저장 성공: ${file} (${jsonString.length} bytes)`);
  } catch (error) {
    console.error(`[Database] 저장 실패: ${file}`, error);
    // 저장 실패 시 재시도 (최대 3회)
    let retries = 3;
    while (retries > 0) {
      try {
        ensureDataDir();
        writeFileSync(file, JSON.stringify(data, null, 2), "utf-8");
        console.log(`[Database] 재시도 후 저장 성공: ${file}`);
        return;
      } catch (retryError) {
        retries--;
        if (retries === 0) {
          console.error(`[Database] 최종 저장 실패: ${file}`, retryError);
          throw retryError;
        }
        console.warn(`[Database] 저장 재시도 중... (남은 시도: ${retries})`);
        // 짧은 지연 후 재시도 (동기적으로 처리)
        const delay = (3 - retries) * 100;
        const start = Date.now();
        while (Date.now() - start < delay) {
          // busy wait
        }
      }
    }
  }
}

class PersistentDatabase {
  users = new Map<string, User>();
  pages = new Map<string, Page>();
  blocks = new Map<string, Block>();
  files = new Map<string, FileAsset>();
  teams = new Map<string, Team>();

  constructor() {
    this.load();
  }

  private load() {
    console.log(`[Database] 데이터 로드 시작: ${DATA_DIR}`);
    const usersData = loadJson<Record<string, User>>(USERS_FILE, {});
    const pagesData = loadJson<Record<string, Page>>(PAGES_FILE, {});
    const blocksData = loadJson<Record<string, Block>>(BLOCKS_FILE, {});
    const filesData = loadJson<Record<string, FileAsset>>(FILES_FILE, {});
    const teamsData = loadJson<Record<string, Team>>(TEAMS_FILE, {});

    this.users = new Map(Object.entries(usersData));
    this.pages = new Map(Object.entries(pagesData));
    this.blocks = new Map(Object.entries(blocksData));
    this.files = new Map(Object.entries(filesData));
    this.teams = new Map(Object.entries(teamsData));
    
    console.log(`[Database] 데이터 로드 완료: 사용자 ${this.users.size}명, 페이지 ${this.pages.size}개, 블록 ${this.blocks.size}개, 파일 ${this.files.size}개, 팀 ${this.teams.size}개`);
  }

  save() {
    try {
      saveJson(USERS_FILE, Object.fromEntries(this.users));
      saveJson(PAGES_FILE, Object.fromEntries(this.pages));
      saveJson(BLOCKS_FILE, Object.fromEntries(this.blocks));
      saveJson(FILES_FILE, Object.fromEntries(this.files));
      saveJson(TEAMS_FILE, Object.fromEntries(this.teams));
      console.log(`[Database] 모든 데이터 저장 완료`);
    } catch (error) {
      console.error(`[Database] 데이터 저장 중 오류 발생:`, error);
      throw error;
    }
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

    // 사용자 생성 시 즉시 저장 (데이터 손실 방지)
    try {
      this.save();
      console.log(`[Database] 사용자 생성 및 저장 완료: ${email} (${id})`);
      
      // 저장 확인: 파일이 실제로 저장되었는지 확인
      if (existsSync(USERS_FILE)) {
        const savedData = loadJson<Record<string, User>>(USERS_FILE, {});
        if (savedData[id]) {
          console.log(`[Database] 사용자 저장 확인 완료: ${email}`);
        } else {
          console.error(`[Database] 경고: 사용자가 파일에 저장되지 않았습니다: ${email}`);
        }
      }
    } catch (error) {
      console.error(`[Database] 사용자 생성 후 저장 실패: ${email}`, error);
      // 저장 실패해도 사용자는 생성되었으므로 에러를 던지지 않음
      // 다음 save() 호출 시 저장될 것
    }
    
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

// DATABASE_URL이 있으면 PostgreSQL 사용, 없으면 파일 기반 사용
let dbInstance: PersistentDatabase | import("./postgres-database.js").PostgresDatabase | null = null;

async function initializeDatabase() {
  if (dbInstance) return dbInstance;
  
  if (process.env.DATABASE_URL) {
    // PostgreSQL 데이터베이스 사용
    const { PostgresDatabase } = await import("./postgres-database.js");
    const pgDb = new PostgresDatabase();
    await pgDb.initialize();
    dbInstance = pgDb;
    console.log("[Database] PostgreSQL 데이터베이스 사용");
  } else {
    // 파일 기반 데이터베이스 사용
    dbInstance = new PersistentDatabase();
    console.log("[Database] 파일 기반 데이터베이스 사용");
  }
  
  return dbInstance;
}

// 기본적으로 파일 기반 사용 (호환성)
// initializeDatabase()가 호출되면 dbInstance로 교체됨
const fileDb = new PersistentDatabase();

// db getter: dbInstance가 있으면 사용, 없으면 fileDb 사용
export const db = new Proxy(fileDb, {
  get(target, prop) {
    if (dbInstance) {
      return (dbInstance as any)[prop];
    }
    return (target as any)[prop];
  }
}) as PersistentDatabase;

// PostgreSQL을 사용하려면 initializeDatabase()를 먼저 호출해야 함
export { initializeDatabase };
