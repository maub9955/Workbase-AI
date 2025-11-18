import { Module } from "@nestjs/common";
import { TeamsController } from "./teams.controller.js";
import { TeamsService } from "./teams.service.js";
import { AuthModule } from "../auth/auth.module.js";
import { EmailModule } from "../email/email.module.js";

@Module({
  imports: [AuthModule, EmailModule],
  controllers: [TeamsController],
  providers: [TeamsService]
})
export class TeamsModule {}

