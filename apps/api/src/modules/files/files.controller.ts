import { Controller, Get, Headers, HttpException, HttpStatus, Inject, Param, Post, Query, Req, Res, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { Request, Response } from "express";
import { FilesService } from "./files.service.js";
import { AuthService } from "../auth/auth.service.js";
import { writeFileSync, mkdirSync, existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

@Controller("files")
export class FilesController {
  private readonly storageDir = join(process.cwd(), "storage", "files");
  private readonly filesService: FilesService;
  private readonly authService: AuthService;

  constructor(
    @Inject(FilesService) filesService: FilesService,
    @Inject(AuthService) authService: AuthService
  ) {
    this.filesService = filesService;
    this.authService = authService;
    if (!existsSync(this.storageDir)) {
      mkdirSync(this.storageDir, { recursive: true });
    }
  }

  @Post("upload")
  @UseInterceptors(FileInterceptor("file"))
  uploadFile(
    @Headers("x-user-token") token: string | undefined,
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request
  ) {
    try {
      if (!token) {
        throw new HttpException("인증이 필요합니다.", HttpStatus.UNAUTHORIZED);
      }

      const user = this.authService.authenticate(token);
      
      if (!file) {
        throw new HttpException("파일이 없습니다.", HttpStatus.BAD_REQUEST);
      }

      const pageId = (req.body as any)?.pageId || undefined;

      let result;
      try {
        result = this.filesService.uploadFile(user.id, {
          filename: file.originalname,
          size: file.size,
          mimeType: file.mimetype,
          pageId: pageId
        });
      } catch (serviceError: any) {
        console.error("FilesService error:", serviceError);
        throw new HttpException(
          serviceError.message || "파일 업로드 처리에 실패했습니다.",
          serviceError.status || HttpStatus.INTERNAL_SERVER_ERROR
        );
      }

      try {
        const fileDir = join(this.storageDir, result.file.id);
        if (!existsSync(fileDir)) {
          mkdirSync(fileDir, { recursive: true });
        }
        const filePath = join(fileDir, file.originalname);
        writeFileSync(filePath, file.buffer);
      } catch (storageError: any) {
        console.error("File storage error:", storageError);
        throw new HttpException(
          `파일 저장에 실패했습니다: ${storageError.message}`,
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      }

      return result;
    } catch (error: any) {
      console.error("File upload error:", error);
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        error.message || "파일 업로드에 실패했습니다.",
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get(":id")
  getFile(@Param("id") fileId: string, @Headers("x-user-token") token?: string) {
    const user = this.authService.authenticate(token);
    return this.filesService.getFile(user.id, fileId);
  }

  @Post(":id/shared-link")
  createSharedLink(
    @Param("id") fileId: string,
    @Headers("x-user-token") token: string | undefined,
    @Headers("expires-in-days") expiresInDays?: string
  ) {
    const user = this.authService.authenticate(token);
    const days = expiresInDays ? parseInt(expiresInDays, 10) : undefined;
    return this.filesService.createSharedLink(user.id, fileId, days);
  }

  @Get(":id/download")
  downloadFile(
    @Param("id") fileId: string,
    @Query("token") token?: string,
    @Headers("x-user-token") userToken?: string,
    @Res() res?: Response
  ) {
    try {
      let file;
      const authToken = userToken || token;
      
      if (authToken) {
        try {
          const user = this.authService.authenticate(authToken);
          file = this.filesService.getFile(user.id, fileId);
        } catch {
          try {
            file = this.filesService.getFile("", fileId);
            if (file.sharedLinkToken && file.sharedLinkToken !== token) {
              return res?.status(403).json({ message: "유효하지 않은 토큰입니다." });
            }
            if (file.sharedLinkExpiresAt && new Date(file.sharedLinkExpiresAt) < new Date()) {
              return res?.status(403).json({ message: "공유 링크가 만료되었습니다." });
            }
          } catch {
            return res?.status(401).json({ message: "인증이 필요합니다." });
          }
        }
      } else {
        return res?.status(401).json({ message: "인증이 필요합니다." });
      }

      const filePath = join(this.storageDir, file.id, file.title);
      if (existsSync(filePath)) {
        const fileBuffer = readFileSync(filePath);
        res?.setHeader("Content-Type", file.mimeType);
        res?.setHeader("Content-Disposition", `inline; filename="${encodeURIComponent(file.title)}"`);
        return res?.send(fileBuffer);
      }

      return res?.status(404).json({ message: "파일을 찾을 수 없습니다." });
    } catch (error: any) {
      return res?.status(404).json({ message: error.message || "파일을 찾을 수 없습니다." });
    }
  }
}
