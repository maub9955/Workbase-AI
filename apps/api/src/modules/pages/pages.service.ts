import { ForbiddenException, Injectable, Inject, NotFoundException } from "@nestjs/common";
import { randomUUID } from "node:crypto";
import { db, type Page, type PageTreeNode } from "../../storage/database.js";
import { AddEntryDto } from "./dto/add-entry.dto.js";
import { AddCollaboratorDto } from "./dto/add-collaborator.dto.js";
import { CreatePageDto } from "./dto/create-page.dto.js";
import { UpdatePageDto } from "./dto/update-page.dto.js";
import { CreateBlockDto } from "./dto/create-block.dto.js";
import { EmailService } from "../email/email.service.js";

@Injectable()
export class PagesService {
  private readonly emailService: EmailService;

  constructor(@Inject(EmailService) emailService: EmailService) {
    this.emailService = emailService;
  }

  private ensureAccess(userId: string, pageId: string) {
    const page = db.pages.get(pageId);
    if (!page) {
      throw new NotFoundException("페이지가 없습니다.");
    }
    if (!page.collaborators.includes(userId)) {
      throw new ForbiddenException("페이지 권한이 없습니다.");
    }
    return page;
  }

  getPersonalPage(userId: string) {
    const user = db.users.get(userId);
    if (!user) {
      throw new NotFoundException("사용자를 찾을 수 없습니다.");
    }
    
    // personalPageId가 없거나 페이지가 없는 경우 자동 생성
    if (!user.personalPageId) {
      const personalPageId = randomUUID();
      const now = new Date().toISOString();
      
      const page: Page = {
        id: personalPageId,
        workspaceId: `workspace-${userId}`,
        title: `${user.name}님의 개인 워크스페이스`,
        ownerId: userId,
        collaborators: [userId],
        childPageIds: [],
        blockIds: [],
        position: 0,
        createdAt: now,
        updatedAt: now
      };
      
      db.pages.set(personalPageId, page);
      user.personalPageId = personalPageId;
      db.save();
      
      return db.serializePageWithEntries(personalPageId);
    }
    
    const page = db.pages.get(user.personalPageId);
    if (!page) {
      // 페이지가 삭제된 경우 재생성
      const personalPageId = randomUUID();
      const now = new Date().toISOString();
      
      const newPage: Page = {
        id: personalPageId,
        workspaceId: `workspace-${userId}`,
        title: `${user.name}님의 개인 워크스페이스`,
        ownerId: userId,
        collaborators: [userId],
        childPageIds: [],
        blockIds: [],
        position: 0,
        createdAt: now,
        updatedAt: now
      };
      
      db.pages.set(personalPageId, newPage);
      user.personalPageId = personalPageId;
      db.save();
      
      return db.serializePageWithEntries(personalPageId);
    }
    
    try {
      return db.serializePageWithEntries(user.personalPageId);
    } catch (error: any) {
      if (error.message === "PAGE_NOT_FOUND") {
        // 페이지가 없는 경우 재생성
        const personalPageId = randomUUID();
        const now = new Date().toISOString();
        
        const newPage: Page = {
          id: personalPageId,
          workspaceId: `workspace-${userId}`,
          title: `${user.name}님의 개인 워크스페이스`,
          ownerId: userId,
          collaborators: [userId],
          childPageIds: [],
          blockIds: [],
          position: 0,
          createdAt: now,
          updatedAt: now
        };
        
        db.pages.set(personalPageId, newPage);
        user.personalPageId = personalPageId;
        db.save();
        
        return db.serializePageWithEntries(personalPageId);
      }
      throw error;
    }
  }

  getPageTree(userId: string) {
    const user = db.users.get(userId);
    if (!user) {
      throw new NotFoundException("사용자를 찾을 수 없습니다.");
    }
    
    // 사용자가 소유한 모든 루트 페이지 찾기 (parentPageId가 null인 페이지)
    const rootPages: Page[] = [];
    for (const page of db.pages.values()) {
      if (page.ownerId === userId && !page.parentPageId) {
        rootPages.push(page);
      }
    }
    
    // position 순서로 정렬
    rootPages.sort((a, b) => (b.position ?? 0) - (a.position ?? 0));
    
    // 개인 워크스페이스가 첫 번째에 오도록 보장
    const personalPage = db.pages.get(user.personalPageId);
    if (personalPage) {
      const personalIndex = rootPages.findIndex(p => p.id === personalPage.id);
      if (personalIndex > 0) {
        rootPages.splice(personalIndex, 1);
        rootPages.unshift(personalPage);
      } else if (personalIndex === -1) {
        rootPages.unshift(personalPage);
      }
    }
    
    // 가상의 루트 노드 생성하여 모든 루트 페이지를 자식으로 표시
    const buildTree = (page: Page): PageTreeNode => {
      const children = page.childPageIds
        .map((childId) => {
          const child = db.pages.get(childId);
          if (!child || !child.collaborators.includes(userId)) {
            return null;
          }
          return buildTree(child);
        })
        .filter((node): node is PageTreeNode => node !== null)
        .sort((a, b) => {
          const aPage = db.pages.get(a.id);
          const bPage = db.pages.get(b.id);
          return (bPage?.position ?? 0) - (aPage?.position ?? 0);
        });

      return {
        id: page.id,
        title: page.title,
        icon: page.icon,
        children
      };
    };
    
    // 첫 번째 루트 페이지를 메인 루트로 사용하고, 나머지를 자식으로 추가
    if (rootPages.length === 0) {
      throw new NotFoundException("개인 페이지가 없습니다.");
    }
    
    const mainRoot = rootPages[0];
    const mainRootTree = buildTree(mainRoot);
    
    // 나머지 루트 페이지들을 메인 루트의 형제처럼 표시하기 위해 자식으로 추가
    // (사이드바에서 같은 레벨로 보이도록)
    const otherRoots = rootPages.slice(1).map(page => buildTree(page));
    mainRootTree.children = [...otherRoots, ...mainRootTree.children];
    
    return mainRootTree;
  }

  getPage(userId: string, pageId: string) {
    this.ensureAccess(userId, pageId);
    try {
      return db.serializePageWithEntries(pageId);
    } catch (error: any) {
      if (error.message === "PAGE_NOT_FOUND") {
        throw new NotFoundException("페이지를 찾을 수 없습니다.");
      }
      throw error;
    }
  }

  getBlocks(userId: string, pageId: string) {
    this.ensureAccess(userId, pageId);
    return db.getBlocksForPage(pageId);
  }

  createPage(userId: string, payload: CreatePageDto) {
    const parentId = payload.parentPageId;
    let actualParentId: string | null = null;

    if (parentId) {
      // 하위 페이지 생성 (특정 페이지의 자식)
      this.ensureAccess(userId, parentId);
      actualParentId = parentId;
    } else {
      // 상위 페이지 생성 (개인 워크스페이스와 같은 레벨, 독립된 루트 페이지)
      // parentPageId를 null로 설정하여 루트 페이지로 만듦
      actualParentId = null;
    }

    const pageId = randomUUID();
    const page = db.createPage({
      id: pageId,
      title: payload.title,
      ownerId: userId,
      parentPageId: actualParentId,
      collaborators: [userId]
    });

    // 새 페이지 생성 시 빈 paragraph 블록 자동 생성 (각 페이지별 독립성 보장)
    const paragraphBlock = db.createBlock({
      pageId,
      authorId: userId,
      type: "paragraph",
      props: { text: "", html: "" },
      position: 0
    });
    page.blockIds.push(paragraphBlock.id);

    if (actualParentId) {
      const parent = db.pages.get(actualParentId);
      if (parent) {
        parent.childPageIds.push(pageId);
      }
    }

    db.save();
    return db.serializePageWithEntries(pageId);
  }

  updatePage(userId: string, pageId: string, payload: UpdatePageDto) {
    const page = this.ensureAccess(userId, pageId);
    if (page.ownerId !== userId) {
      throw new ForbiddenException("페이지 소유자만 수정할 수 있습니다.");
    }

    if (payload.title !== undefined) {
      page.title = payload.title;
    }
    if (payload.icon !== undefined) {
      page.icon = payload.icon;
    }
    if (payload.parentPageId !== undefined) {
      const oldParent = page.parentPageId ? db.pages.get(page.parentPageId) : null;
      if (oldParent) {
        oldParent.childPageIds = oldParent.childPageIds.filter((id) => id !== pageId);
      }

      if (payload.parentPageId) {
        this.ensureAccess(userId, payload.parentPageId);
        const newParent = db.pages.get(payload.parentPageId);
        if (newParent) {
          newParent.childPageIds.push(pageId);
        }
        page.parentPageId = payload.parentPageId;
      } else {
        page.parentPageId = null;
      }
    }

    page.updatedAt = new Date().toISOString();
    db.save();
    return db.serializePageWithEntries(pageId);
  }

  deletePage(userId: string, pageId: string) {
    const page = this.ensureAccess(userId, pageId);
    if (page.ownerId !== userId) {
      throw new ForbiddenException("페이지 소유자만 삭제할 수 있습니다.");
    }

    if (page.parentPageId) {
      const parent = db.pages.get(page.parentPageId);
      if (parent) {
        parent.childPageIds = parent.childPageIds.filter((id) => id !== pageId);
      }
    }

    db.pages.delete(pageId);
    db.save();
    return { success: true };
  }

  createBlock(userId: string, pageId: string, payload: CreateBlockDto) {
    this.ensureAccess(userId, pageId);
    const blockType = payload.type as any;
    
    // 기존 블록들의 최대 position 찾기
    const page = db.pages.get(pageId);
    const existingBlocks = page ? page.blockIds.map(id => db.blocks.get(id)).filter(Boolean) : [];
    const maxPosition = existingBlocks.length > 0 
      ? Math.max(...existingBlocks.map(b => b?.position ?? 0))
      : Date.now();
    
    // 최대 position보다 훨씬 높게 설정하여 본문 최상단에 표시되도록
    // Date.now()는 밀리초 단위이므로, 큰 값을 더해 확실히 위에 표시되도록 함
    const newPosition = maxPosition + 1000000;
    
    return db.createBlock({
      pageId,
      authorId: userId,
      type: blockType,
      props: payload.props ?? {},
      position: newPosition,
      parentBlockId: payload.parentBlockId
    });
  }

  getBlock(userId: string, blockId: string) {
    const block = db.blocks.get(blockId);
    if (!block) {
      throw new NotFoundException("블록이 없습니다.");
    }

    const page = db.pages.get(block.pageId);
    if (!page || !page.collaborators.includes(userId)) {
      throw new ForbiddenException("블록 조회 권한이 없습니다.");
    }

    return block;
  }

  updateBlock(userId: string, blockId: string, props: Record<string, unknown>) {
    const block = db.blocks.get(blockId);
    if (!block) {
      throw new NotFoundException("블록이 없습니다.");
    }

    const page = db.pages.get(block.pageId);
    if (!page || !page.collaborators.includes(userId)) {
      throw new ForbiddenException("블록 수정 권한이 없습니다.");
    }

    // position 업데이트 처리
    if (props.position !== undefined) {
      block.position = props.position as number;
      // 페이지의 blockIds 순서 재정렬
      page.blockIds.sort((aId, bId) => {
        const a = db.blocks.get(aId);
        const b = db.blocks.get(bId);
        return (b?.position ?? 0) - (a?.position ?? 0);
      });
    } else {
      block.props = { ...block.props, ...props };
    }
    
    page.updatedAt = new Date().toISOString();
    db.save();
    return block;
  }

  reorderBlocks(userId: string, pageId: string, blockIds: string[]) {
    const page = this.ensureAccess(userId, pageId);
    
    // 모든 블록이 해당 페이지에 속하는지 확인
    const validBlockIds: string[] = [];
    for (const blockId of blockIds) {
      const block = db.blocks.get(blockId);
      if (block && block.pageId === pageId) {
        validBlockIds.push(blockId);
      }
    }
    
    // 페이지에 있는 모든 블록 ID 수집 (요청에 없는 블록도 포함)
    const allPageBlockIds = new Set(page.blockIds);
    const requestedBlockIds = new Set(validBlockIds);
    
    // 요청에 없는 블록들은 맨 뒤에 추가
    const missingBlockIds = Array.from(allPageBlockIds).filter(id => !requestedBlockIds.has(id));
    const finalBlockIds = [...validBlockIds, ...missingBlockIds];
    
    // position 업데이트 (역순으로, position이 높을수록 위에 표시)
    const now = Date.now();
    finalBlockIds.forEach((blockId, index) => {
      const block = db.blocks.get(blockId);
      if (block) {
        block.position = now - index;
      }
    });
    
    // 페이지의 blockIds 순서 업데이트
    page.blockIds = finalBlockIds;
    page.blockIds.sort((aId, bId) => {
      const a = db.blocks.get(aId);
      const b = db.blocks.get(bId);
      return (b?.position ?? 0) - (a?.position ?? 0);
    });
    
    page.updatedAt = new Date().toISOString();
    db.save();
    return { success: true };
  }

  deleteBlock(userId: string, blockId: string) {
    const block = db.blocks.get(blockId);
    if (!block) {
      throw new NotFoundException("블록이 없습니다.");
    }

    const page = db.pages.get(block.pageId);
    if (!page || !page.collaborators.includes(userId)) {
      throw new ForbiddenException("블록 삭제 권한이 없습니다.");
    }

    db.blocks.delete(blockId);
    if (page.blockIds.includes(blockId)) {
      page.blockIds = page.blockIds.filter((id) => id !== blockId);
    }
    page.updatedAt = new Date().toISOString();
    db.save();
    return { success: true };
  }

  addEntry(userId: string, pageId: string, payload: AddEntryDto) {
    this.ensureAccess(userId, pageId);
    return db.addTextEntry(pageId, userId, payload.content);
  }

  async addCollaborator(ownerId: string, pageId: string, payload: AddCollaboratorDto) {
    const page = this.ensureAccess(ownerId, pageId);
    if (page.ownerId !== ownerId) {
      throw new ForbiddenException("담당자만 초대할 수 있습니다.");
    }

    const user = db.findUserByEmail(payload.email);
    if (!user) {
      throw new NotFoundException("해당 이메일 사용자가 없습니다. 먼저 회원가입해야 합니다.");
    }

    if (!page.collaborators.includes(user.id)) {
      page.collaborators.push(user.id);
      db.save();
    }

    const owner = db.users.get(ownerId);
    const ownerName = owner?.name || "사용자";
    const inviteLink = `${process.env.FRONTEND_URL || "http://localhost:3000"}/workspace?page=${pageId}`;
    
    await this.emailService.sendInviteEmail(payload.email, page.title, ownerName, inviteLink);

    return { collaboratorId: user.id };
  }

  removeCollaborator(ownerId: string, pageId: string, collaboratorId: string) {
    const page = this.ensureAccess(ownerId, pageId);
    if (page.ownerId !== ownerId) {
      throw new ForbiddenException("담당자만 제거할 수 있습니다.");
    }

    if (page.ownerId === collaboratorId) {
      throw new ForbiddenException("소유자는 제거할 수 없습니다.");
    }

    page.collaborators = page.collaborators.filter((id) => id !== collaboratorId);
    db.save();
    return { success: true };
  }
}
