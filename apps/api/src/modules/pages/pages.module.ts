import { Module } from "@nestjs/common";
import { PagesService } from "./pages.service.js";
import { PagesController } from "./pages.controller.js";
import { AuthModule } from "../auth/auth.module.js";
import { EmailModule } from "../email/email.module.js";

@Module({
  imports: [AuthModule, EmailModule],
  providers: [PagesService],
  controllers: [PagesController]
})
export class PagesModule {}
