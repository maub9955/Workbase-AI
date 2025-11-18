import { randomUUID } from "node:crypto";
import { Pool, type QueryResult } from "pg";
import type { User, Page, Block, FileAsset, Team, PageEntry, PageSnapshot, PageTreeNode } from "./database.js";

// PostgreSQL 연결 풀 생성
let pool: Pool | null = null;

function getPool(): Pool {
  if (!pool) {
    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl) {
      throw new Error("DATABASE_URL environment variable is not set");
    }
    pool = new Pool({
      connectionString: databaseUrl,
      ssl: databaseUrl.includes("supabase") ? { rejectUnauthorized: false } : undefined,
    });
    console.log("[Database] PostgreSQL 연결 풀 생성 완료");
  }
  return pool;
}

// PostgreSQL 데이터베이스 클래스
export class PostgresDatabase {
  private async query<T = unknown>(text: string, params?: unknown[]): Promise<QueryResult<T>> {
    const client = getPool();
    try {
      return await client.query<T>(text, params);
    } catch (error) {
      console.error("[Database] 쿼리 실행 오류:", error);
      throw error;
    }
  }

  async initialize() {
    try {
      // 연결 테스트
      await this.query("SELECT 1");
      console.log("[Database] PostgreSQL 연결 성공");
    } catch (error) {
      console.error("[Database] PostgreSQL 연결 실패:", error);
      throw error;
    }
  }

  // Users
  async findUserByEmail(email: string): Promise<User | null> {
    const result = await this.query<User>(
      "SELECT id, email, password, name, personal_page_id as \"personalPageId\", team_ids as \"teamIds\" FROM users WHERE email = $1",
      [email]
    );
    return result.rows[0] || null;
  }

  async getUserById(id: string): Promise<User | null> {
    const result = await this.query<User>(
      "SELECT id, email, password, name, personal_page_id as \"personalPageId\", team_ids as \"teamIds\" FROM users WHERE id = $1",
      [id]
    );
    return result.rows[0] || null;
  }

  async createUser({ email, password, name }: { email: string; password: string; name: string }): Promise<{ user: User; page: PageSnapshot }> {
    const id = randomUUID();
    const personalPageId = randomUUID();
    const now = new Date().toISOString();

    // 트랜잭션 시작
    const client = await getPool().connect();
    try {
      await client.query("BEGIN");

      // 사용자 생성
      await client.query(
        "INSERT INTO users (id, email, password, name, personal_page_id) VALUES ($1, $2, $3, $4, $5)",
        [id, email, password, name, personalPageId]
      );

      // 페이지 생성
      await client.query(
        "INSERT INTO pages (id, workspace_id, title, owner_id, collaborators, position, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
        [personalPageId, `workspace-${id}`, `${name}님의 개인 워크스페이스`, id, [id], 0, now, now]
      );

      // 환영 메시지 블록 생성
      const welcomeBlockId = randomUUID();
      await client.query(
        "INSERT INTO blocks (id, page_id, author_id, type, props, position, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
        [welcomeBlockId, personalPageId, id, "paragraph", JSON.stringify({ text: "환영합니다! 여기는 나만을 위한 개인 페이지입니다." }), 0, now, now]
      );

      // 페이지의 block_ids 업데이트
      await client.query(
        "UPDATE pages SET block_ids = $1 WHERE id = $2",
        [[welcomeBlockId], personalPageId]
      );

      await client.query("COMMIT");

      const user: User = { id, email, password, name, personalPageId };
      const page = await this.getPageSnapshot(personalPageId);

      console.log(`[Database] 사용자 생성 및 저장 완료: ${email} (${id})`);
      return { user, page };
    } catch (error) {
      await client.query("ROLLBACK");
      console.error(`[Database] 사용자 생성 실패: ${email}`, error);
      throw error;
    } finally {
      client.release();
    }
  }

  // Pages
  async getPage(pageId: string): Promise<Page | null> {
    const result = await this.query<{
      id: string;
      workspace_id: string;
      title: string;
      owner_id: string;
      parent_page_id: string | null;
      collaborators: string[];
      child_page_ids: string[];
      block_ids: string[];
      position: number;
      created_at: string;
      updated_at: string;
    }>(
      "SELECT id, workspace_id, title, owner_id, parent_page_id, collaborators, child_page_ids, block_ids, position, created_at, updated_at FROM pages WHERE id = $1",
      [pageId]
    );

    if (result.rows.length === 0) return null;

    const row = result.rows[0];
    return {
      id: row.id,
      workspaceId: row.workspace_id,
      title: row.title,
      ownerId: row.owner_id,
      parentPageId: row.parent_page_id,
      collaborators: row.collaborators,
      childPageIds: row.child_page_ids,
      blockIds: row.block_ids,
      position: row.position,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
  }

  async getPageSnapshot(pageId: string): Promise<PageSnapshot> {
    const page = await this.getPage(pageId);
    if (!page) {
      throw new Error(`Page not found: ${pageId}`);
    }

    const blocks = await this.getBlocksForPage(pageId);
    const entries: PageEntry[] = blocks
      .filter((b) => b.type === "paragraph")
      .map((b) => ({
        id: b.id,
        authorId: b.createdBy,
        content: String(b.props.text || ""),
        createdAt: b.createdAt,
      }));

    return {
      ...page,
      entries,
    };
  }

  async createPage({
    id,
    title,
    ownerId,
    parentPageId,
    collaborators,
  }: {
    id: string;
    title: string;
    ownerId: string;
    parentPageId?: string | null;
    collaborators: string[];
  }): Promise<Page> {
    const now = new Date().toISOString();
    const workspaceId = `workspace-${ownerId}`;

    const client = await getPool().connect();
    try {
      await client.query("BEGIN");

      // 페이지 생성
      await client.query(
        "INSERT INTO pages (id, workspace_id, title, owner_id, parent_page_id, collaborators, position, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)",
        [id, workspaceId, title, ownerId, parentPageId || null, collaborators, 0, now, now]
      );

      // 부모 페이지가 있으면 child_page_ids 업데이트
      if (parentPageId) {
        const parentResult = await client.query("SELECT child_page_ids FROM pages WHERE id = $1", [parentPageId]);
        const childPageIds = parentResult.rows[0]?.child_page_ids || [];
        await client.query("UPDATE pages SET child_page_ids = $1 WHERE id = $2", [[...childPageIds, id], parentPageId]);
      }

      // 빈 paragraph 블록 생성
      const paragraphBlockId = randomUUID();
      await client.query(
        "INSERT INTO blocks (id, page_id, author_id, type, props, position, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
        [paragraphBlockId, id, ownerId, "paragraph", JSON.stringify({ text: "", html: "" }), 0, now, now]
      );

      // 페이지의 block_ids 업데이트
      await client.query("UPDATE pages SET block_ids = $1 WHERE id = $2", [[paragraphBlockId], id]);

      await client.query("COMMIT");

      const page = await this.getPage(id);
      if (!page) throw new Error("Failed to create page");
      return page;
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  }

  async updatePageTitle(pageId: string, title: string): Promise<void> {
    await this.query("UPDATE pages SET title = $1, updated_at = NOW() WHERE id = $2", [title, pageId]);
  }

  async deletePage(pageId: string): Promise<void> {
    const client = await getPool().connect();
    try {
      await client.query("BEGIN");

      // 페이지 삭제 (CASCADE로 관련 블록과 파일도 자동 삭제됨)
      await client.query("DELETE FROM pages WHERE id = $1", [pageId]);

      await client.query("COMMIT");
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  }

  // Blocks
  async getBlocksForPage(pageId: string): Promise<Block[]> {
    const result = await this.query<{
      id: string;
      page_id: string;
      author_id: string;
      type: string;
      props: unknown;
      position: number;
      created_at: string;
    }>(
      "SELECT id, page_id, author_id, type, props, position, created_at FROM blocks WHERE page_id = $1 ORDER BY position DESC",
      [pageId]
    );

    return result.rows.map((row) => ({
      id: row.id,
      pageId: row.page_id,
      type: row.type as Block["type"],
      props: typeof row.props === "string" ? JSON.parse(row.props) : (row.props as Record<string, unknown>),
      position: row.position,
      createdAt: row.created_at,
      createdBy: row.author_id,
    }));
  }

  async createBlock({
    pageId,
    authorId,
    type,
    props,
    position,
  }: {
    pageId: string;
    authorId: string;
    type: Block["type"];
    props: Record<string, unknown>;
    position?: number;
  }): Promise<Block> {
    const id = randomUUID();
    const now = new Date().toISOString();

    // position이 없으면 최대값 + 1000000 계산
    let actualPosition = position;
    if (actualPosition === undefined) {
      const maxResult = await this.query<{ max: number }>("SELECT COALESCE(MAX(position), 0) as max FROM blocks WHERE page_id = $1", [pageId]);
      actualPosition = (maxResult.rows[0]?.max || 0) + 1000000;
    }

    await this.query(
      "INSERT INTO blocks (id, page_id, author_id, type, props, position, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
      [id, pageId, authorId, type, JSON.stringify(props), actualPosition, now, now]
    );

    // 페이지의 block_ids 업데이트
    const pageResult = await this.query<{ block_ids: string[] }>("SELECT block_ids FROM pages WHERE id = $1", [pageId]);
    const blockIds = pageResult.rows[0]?.block_ids || [];
    await this.query("UPDATE pages SET block_ids = $1 WHERE id = $2", [[...blockIds, id], pageId]);

    const block: Block = {
      id,
      pageId,
      type,
      props,
      position: actualPosition,
      createdAt: now,
      createdBy: authorId,
    };

    return block;
  }

  async updateBlock(blockId: string, props: Record<string, unknown>): Promise<void> {
    await this.query("UPDATE blocks SET props = $1, updated_at = NOW() WHERE id = $2", [JSON.stringify(props), blockId]);
  }

  async deleteBlock(blockId: string): Promise<void> {
    const client = await getPool().connect();
    try {
      await client.query("BEGIN");

      // 블록 삭제
      await this.query("DELETE FROM blocks WHERE id = $1", [blockId]);

      // 페이지의 block_ids에서 제거
      const pageResult = await this.query<{ page_id: string; block_ids: string[] }>(
        "SELECT page_id, block_ids FROM pages WHERE $1 = ANY(block_ids)",
        [blockId]
      );
      if (pageResult.rows.length > 0) {
        const { page_id, block_ids } = pageResult.rows[0];
        const updatedBlockIds = block_ids.filter((id) => id !== blockId);
        await this.query("UPDATE pages SET block_ids = $1 WHERE id = $2", [updatedBlockIds, page_id]);
      }

      await client.query("COMMIT");
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  }

  async reorderBlocks(pageId: string, blockIds: string[]): Promise<void> {
    const client = await getPool().connect();
    try {
      await client.query("BEGIN");

      // 각 블록의 position 업데이트
      for (let i = 0; i < blockIds.length; i++) {
        await this.query("UPDATE blocks SET position = $1, updated_at = NOW() WHERE id = $2", [(blockIds.length - i) * 1000000, blockIds[i]]);
      }

      // 페이지의 block_ids 업데이트
      await this.query("UPDATE pages SET block_ids = $1, updated_at = NOW() WHERE id = $2", [blockIds, pageId]);

      await client.query("COMMIT");
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  }

  // Files
  async createFile({
    pageId,
    authorId,
    filename,
    mimeType,
    size,
    url,
  }: {
    pageId: string;
    authorId: string;
    filename: string;
    mimeType: string;
    size: number;
    url: string;
  }): Promise<FileAsset> {
    const id = randomUUID();
    const now = new Date().toISOString();

    // 최대 position 계산
    const maxResult = await this.query<{ max: number }>("SELECT COALESCE(MAX(position), 0) as max FROM files WHERE page_id = $1", [pageId]);
    const position = (maxResult.rows[0]?.max || 0) + 1000000;

    await this.query(
      "INSERT INTO files (id, page_id, author_id, filename, mime_type, size, url, position, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)",
      [id, pageId, authorId, filename, mimeType, size, url, position, now, now]
    );

    return {
      id,
      workspaceId: `workspace-${authorId}`,
      uploaderId: authorId,
      storageKey: url,
      bucket: "default",
      size,
      mimeType,
      title: filename,
      createdAt: now,
    };
  }

  async getFilesForPage(pageId: string): Promise<FileAsset[]> {
    const result = await this.query<{
      id: string;
      author_id: string;
      filename: string;
      mime_type: string;
      size: number;
      url: string;
      created_at: string;
    }>("SELECT id, author_id, filename, mime_type, size, url, created_at FROM files WHERE page_id = $1 ORDER BY position DESC", [pageId]);

    return result.rows.map((row) => ({
      id: row.id,
      workspaceId: `workspace-${row.author_id}`,
      uploaderId: row.author_id,
      storageKey: row.url,
      bucket: "default",
      size: row.size,
      mimeType: row.mime_type,
      title: row.filename,
      createdAt: row.created_at,
    }));
  }

  // Teams
  async createTeam({ name, description, ownerId }: { name: string; description?: string; ownerId: string }): Promise<Team> {
    const id = randomUUID();
    const now = new Date().toISOString();

    await this.query(
      "INSERT INTO teams (id, name, description, owner_id, member_ids, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7)",
      [id, name, description || null, ownerId, [ownerId], now, now]
    );

    return {
      id,
      name,
      description,
      ownerId,
      memberIds: [ownerId],
      createdAt: now,
      updatedAt: now,
    };
  }

  async getTeamsForUser(userId: string): Promise<Team[]> {
    const result = await this.query<{
      id: string;
      name: string;
      description: string | null;
      owner_id: string;
      member_ids: string[];
      created_at: string;
      updated_at: string;
    }>("SELECT id, name, description, owner_id, member_ids, created_at, updated_at FROM teams WHERE $1 = ANY(member_ids) OR owner_id = $1", [userId]);

    return result.rows.map((row) => ({
      id: row.id,
      name: row.name,
      description: row.description || undefined,
      ownerId: row.owner_id,
      memberIds: row.member_ids,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    }));
  }

  async getTeam(teamId: string): Promise<Team | null> {
    const result = await this.query<{
      id: string;
      name: string;
      description: string | null;
      owner_id: string;
      member_ids: string[];
      created_at: string;
      updated_at: string;
    }>("SELECT id, name, description, owner_id, member_ids, created_at, updated_at FROM teams WHERE id = $1", [teamId]);

    if (result.rows.length === 0) return null;

    const row = result.rows[0];
    return {
      id: row.id,
      name: row.name,
      description: row.description || undefined,
      ownerId: row.owner_id,
      memberIds: row.member_ids,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
  }

  async addTeamMember(teamId: string, userId: string): Promise<void> {
    const teamResult = await this.query<{ member_ids: string[] }>("SELECT member_ids FROM teams WHERE id = $1", [teamId]);
    const memberIds = teamResult.rows[0]?.member_ids || [];
    if (!memberIds.includes(userId)) {
      await this.query("UPDATE teams SET member_ids = $1, updated_at = NOW() WHERE id = $2", [[...memberIds, userId], teamId]);
    }
  }

  async removeTeamMember(teamId: string, userId: string): Promise<void> {
    const teamResult = await this.query<{ member_ids: string[] }>("SELECT member_ids FROM teams WHERE id = $1", [teamId]);
    const memberIds = teamResult.rows[0]?.member_ids || [];
    const updatedMemberIds = memberIds.filter((id) => id !== userId);
    await this.query("UPDATE teams SET member_ids = $1, updated_at = NOW() WHERE id = $2", [updatedMemberIds, teamId]);
  }

  // Page Tree
  async getPageTree(userId: string): Promise<PageTreeNode[]> {
    const result = await this.query<{
      id: string;
      title: string;
      parent_page_id: string | null;
      position: number;
    }>("SELECT id, title, parent_page_id, position FROM pages WHERE owner_id = $1 OR $1 = ANY(collaborators) ORDER BY position", [userId]);

    const pages = result.rows;
    const rootPages = pages.filter((p) => !p.parent_page_id);
    const childrenMap = new Map<string, typeof pages>();
    pages.forEach((page) => {
      if (page.parent_page_id) {
        if (!childrenMap.has(page.parent_page_id)) {
          childrenMap.set(page.parent_page_id, []);
        }
        childrenMap.get(page.parent_page_id)!.push(page);
      }
    });

    function buildTree(page: typeof pages[0]): PageTreeNode {
      const children = (childrenMap.get(page.id) || []).map(buildTree);
      return {
        id: page.id,
        title: page.title,
        children,
      };
    }

    return rootPages.map(buildTree);
  }

  // 통계
  async getStats(): Promise<{ users: number; pages: number; blocks: number; files: number; teams: number }> {
    const [usersResult, pagesResult, blocksResult, filesResult, teamsResult] = await Promise.all([
      this.query<{ count: string }>("SELECT COUNT(*) as count FROM users"),
      this.query<{ count: string }>("SELECT COUNT(*) as count FROM pages"),
      this.query<{ count: string }>("SELECT COUNT(*) as count FROM blocks"),
      this.query<{ count: string }>("SELECT COUNT(*) as count FROM files"),
      this.query<{ count: string }>("SELECT COUNT(*) as count FROM teams"),
    ]);

    return {
      users: parseInt(usersResult.rows[0]?.count || "0", 10),
      pages: parseInt(pagesResult.rows[0]?.count || "0", 10),
      blocks: parseInt(blocksResult.rows[0]?.count || "0", 10),
      files: parseInt(filesResult.rows[0]?.count || "0", 10),
      teams: parseInt(teamsResult.rows[0]?.count || "0", 10),
    };
  }
}

