import { Module } from "@nestjs/common";
import { FilesService } from "./files.service.js";
import { FilesController } from "./files.controller.js";
import { AuthModule } from "../auth/auth.module.js";

@Module({
  imports: [AuthModule],
  providers: [FilesService],
  controllers: [FilesController]
})
export class FilesModule {}
