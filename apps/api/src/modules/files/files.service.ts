import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { randomUUID } from "node:crypto";
import { db, FileAsset } from "../../storage/database.js";
import { UploadFileDto } from "./dto/upload-file.dto.js";

@Injectable()
export class FilesService {
  uploadFile(userId: string, payload: UploadFileDto) {
    const fileId = randomUUID();
    const user = db.users.get(userId);
    if (!user) {
      throw new NotFoundException("사용자를 찾을 수 없습니다.");
    }

    if (payload.pageId) {
      const page = db.pages.get(payload.pageId);
      if (!page || !page.collaborators.includes(userId)) {
        throw new ForbiddenException("파일 업로드 권한이 없습니다.");
      }
    }

    const file: FileAsset = {
      id: fileId,
      workspaceId: `workspace-${userId}`,
      uploaderId: userId,
      storageKey: `files/${fileId}/${payload.filename}`,
      bucket: "notion-clone",
      size: payload.size,
      mimeType: payload.mimeType,
      title: payload.filename,
      createdAt: new Date().toISOString()
    };

    db.files.set(fileId, file);

    if (payload.pageId) {
      // 기존 블록들의 최대 position 찾기
      const page = db.pages.get(payload.pageId);
      const existingBlocks = page ? page.blockIds.map(id => db.blocks.get(id)).filter(Boolean) : [];
      const maxPosition = existingBlocks.length > 0 
        ? Math.max(...existingBlocks.map(b => b?.position ?? 0))
        : Date.now();
      
      // 최대 position보다 훨씬 높게 설정하여 본문 최상단에 표시되도록
      const newPosition = maxPosition + 1000000;
      
      const block = db.createBlock({
        pageId: payload.pageId,
        authorId: userId,
        type: "file",
        props: { fileId, filename: payload.filename, size: payload.size, mimeType: payload.mimeType },
        position: newPosition
      });
      db.save();
      return { file, block };
    }

    db.save();
    return { file };
  }

  getFile(userId: string, fileId: string) {
    const file = db.files.get(fileId);
    if (!file) {
      throw new NotFoundException("파일을 찾을 수 없습니다.");
    }

    if (userId) {
      const user = db.users.get(userId);
      if (!user) {
        throw new NotFoundException("사용자를 찾을 수 없습니다.");
      }

      if (file.workspaceId !== `workspace-${userId}`) {
        const hasAccess = [...db.pages.values()].some(
          (page) => page.collaborators.includes(userId) && page.blockIds.some((blockId) => {
            const block = db.blocks.get(blockId);
            return block?.type === "file" && (block.props as any).fileId === fileId;
          })
        );
        if (!hasAccess) {
          throw new ForbiddenException("파일 접근 권한이 없습니다.");
        }
      }
    }

    return file;
  }

  createSharedLink(userId: string, fileId: string, expiresInDays?: number) {
    const file = this.getFile(userId, fileId);
    const token = randomUUID();
    const expiresAt = expiresInDays
      ? new Date(Date.now() + expiresInDays * 24 * 60 * 60 * 1000).toISOString()
      : undefined;

    file.sharedLinkToken = token;
    file.sharedLinkExpiresAt = expiresAt;
    db.save();

    return { token, expiresAt, url: `/api/files/${fileId}/download?token=${token}` };
  }
}
