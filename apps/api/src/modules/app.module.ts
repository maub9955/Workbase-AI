import { Module } from "@nestjs/common";
import { AppController } from "../presentation/app.controller.js";
import { AppService } from "../services/app.service.js";
import { AuthModule } from "./auth/auth.module.js";
import { PagesModule } from "./pages/pages.module.js";
import { FilesModule } from "./files/files.module.js";
import { TeamsModule } from "./teams/teams.module.js";

@Module({
  imports: [AuthModule, PagesModule, FilesModule, TeamsModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
