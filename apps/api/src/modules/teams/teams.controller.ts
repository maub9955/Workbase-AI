import { Controller, Get, Post, Delete, Body, Param, Headers } from "@nestjs/common";
import { TeamsService } from "./teams.service.js";
import { AuthService } from "../auth/auth.service.js";
import { CreateTeamDto } from "./dto/create-team.dto.js";
import { InviteMemberDto } from "./dto/invite-member.dto.js";

@Controller("teams")
export class TeamsController {
  constructor(
    private readonly teamsService: TeamsService,
    private readonly authService: AuthService
  ) {}

  @Post()
  createTeam(
    @Headers("x-user-token") token: string | undefined,
    @Body() payload: CreateTeamDto
  ) {
    const user = this.authService.authenticate(token);
    return this.teamsService.createTeam(user.id, payload);
  }

  @Get()
  getTeams(@Headers("x-user-token") token: string | undefined) {
    const user = this.authService.authenticate(token);
    return this.teamsService.getTeams(user.id);
  }

  @Get(":id")
  getTeam(
    @Param("id") teamId: string,
    @Headers("x-user-token") token: string | undefined
  ) {
    const user = this.authService.authenticate(token);
    return this.teamsService.getTeam(user.id, teamId);
  }

  @Post(":id/members")
  inviteMember(
    @Param("id") teamId: string,
    @Headers("x-user-token") token: string | undefined,
    @Body() payload: InviteMemberDto
  ) {
    const user = this.authService.authenticate(token);
    return this.teamsService.inviteMember(user.id, teamId, payload);
  }

  @Delete(":id/members/:memberId")
  removeMember(
    @Param("id") teamId: string,
    @Param("memberId") memberId: string,
    @Headers("x-user-token") token: string | undefined
  ) {
    const user = this.authService.authenticate(token);
    return this.teamsService.removeMember(user.id, teamId, memberId);
  }
}

