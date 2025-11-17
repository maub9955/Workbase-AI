import { Body, Controller, Delete, Get, Headers, Inject, Param, Patch, Post } from "@nestjs/common";
import { PagesService } from "./pages.service.js";
import { AuthService } from "../auth/auth.service.js";
import { AddEntryDto } from "./dto/add-entry.dto.js";
import { AddCollaboratorDto } from "./dto/add-collaborator.dto.js";
import { CreatePageDto } from "./dto/create-page.dto.js";
import { UpdatePageDto } from "./dto/update-page.dto.js";
import { CreateBlockDto } from "./dto/create-block.dto.js";

@Controller("pages")
export class PagesController {
  constructor(
    @Inject(PagesService) private readonly pagesService: PagesService,
    @Inject(AuthService) private readonly authService: AuthService
  ) {}

  @Get("tree")
  getPageTree(@Headers("x-user-token") token?: string) {
    const user = this.authService.authenticate(token);
    return this.pagesService.getPageTree(user.id);
  }

  @Get("me")
  getMyPage(@Headers("x-user-token") token?: string) {
    const user = this.authService.authenticate(token);
    return this.pagesService.getPersonalPage(user.id);
  }

  @Get(":id")
  getPage(@Param("id") pageId: string, @Headers("x-user-token") token?: string) {
    const user = this.authService.authenticate(token);
    return this.pagesService.getPage(user.id, pageId);
  }

  @Get(":id/blocks")
  getBlocks(@Param("id") pageId: string, @Headers("x-user-token") token?: string) {
    const user = this.authService.authenticate(token);
    return this.pagesService.getBlocks(user.id, pageId);
  }

  @Post()
  createPage(@Headers("x-user-token") token: string | undefined, @Body() payload: CreatePageDto) {
    const user = this.authService.authenticate(token);
    return this.pagesService.createPage(user.id, payload);
  }

  @Patch(":id")
  updatePage(
    @Param("id") pageId: string,
    @Headers("x-user-token") token: string | undefined,
    @Body() payload: UpdatePageDto
  ) {
    const user = this.authService.authenticate(token);
    return this.pagesService.updatePage(user.id, pageId, payload);
  }

  @Delete(":id")
  deletePage(@Param("id") pageId: string, @Headers("x-user-token") token?: string) {
    const user = this.authService.authenticate(token);
    return this.pagesService.deletePage(user.id, pageId);
  }

  @Post(":id/blocks")
  createBlock(
    @Param("id") pageId: string,
    @Headers("x-user-token") token: string | undefined,
    @Body() payload: CreateBlockDto
  ) {
    const user = this.authService.authenticate(token);
    return this.pagesService.createBlock(user.id, pageId, payload);
  }

  @Get("blocks/:blockId")
  getBlock(@Param("blockId") blockId: string, @Headers("x-user-token") token?: string) {
    const user = this.authService.authenticate(token);
    return this.pagesService.getBlock(user.id, blockId);
  }

  @Patch("blocks/:blockId")
  updateBlock(
    @Param("blockId") blockId: string,
    @Headers("x-user-token") token: string | undefined,
    @Body() props: Record<string, unknown>
  ) {
    const user = this.authService.authenticate(token);
    return this.pagesService.updateBlock(user.id, blockId, props);
  }

  @Delete("blocks/:blockId")
  deleteBlock(@Param("blockId") blockId: string, @Headers("x-user-token") token?: string) {
    const user = this.authService.authenticate(token);
    return this.pagesService.deleteBlock(user.id, blockId);
  }

  @Post(":id/blocks/reorder")
  reorderBlocks(
    @Param("id") pageId: string,
    @Headers("x-user-token") token: string | undefined,
    @Body() body: { blockIds: string[] }
  ) {
    const user = this.authService.authenticate(token);
    return this.pagesService.reorderBlocks(user.id, pageId, body.blockIds);
  }

  @Post(":id/entries")
  addEntry(
    @Param("id") pageId: string,
    @Headers("x-user-token") token: string | undefined,
    @Body() payload: AddEntryDto
  ) {
    const user = this.authService.authenticate(token);
    return this.pagesService.addEntry(user.id, pageId, payload);
  }

  @Post(":id/collaborators")
  addCollaborator(
    @Param("id") pageId: string,
    @Headers("x-user-token") token: string | undefined,
    @Body() payload: AddCollaboratorDto
  ) {
    const user = this.authService.authenticate(token);
    return this.pagesService.addCollaborator(user.id, pageId, payload);
  }

  @Delete(":id/collaborators/:collaboratorId")
  removeCollaborator(
    @Param("id") pageId: string,
    @Param("collaboratorId") collaboratorId: string,
    @Headers("x-user-token") token?: string
  ) {
    const user = this.authService.authenticate(token);
    return this.pagesService.removeCollaborator(user.id, pageId, collaboratorId);
  }
}
