import { Injectable, NotFoundException, ForbiddenException } from "@nestjs/common";
import { randomUUID } from "node:crypto";
import { db, Team } from "../../storage/database.js";
import { CreateTeamDto } from "./dto/create-team.dto.js";
import { InviteMemberDto } from "./dto/invite-member.dto.js";
import { EmailService } from "../email/email.service.js";

@Injectable()
export class TeamsService {
  constructor(private readonly emailService: EmailService) {}

  createTeam(userId: string, payload: CreateTeamDto) {
    const teamId = randomUUID();
    const now = new Date().toISOString();

    const team: Team = {
      id: teamId,
      name: payload.name,
      description: payload.description,
      ownerId: userId,
      memberIds: [userId],
      createdAt: now,
      updatedAt: now
    };

    db.teams.set(teamId, team);

    // 사용자의 teamIds에 추가
    const user = db.users.get(userId);
    if (user) {
      if (!user.teamIds) {
        user.teamIds = [];
      }
      user.teamIds.push(teamId);
      db.save();
    }

    return team;
  }

  getTeams(userId: string) {
    const user = db.users.get(userId);
    if (!user) {
      throw new NotFoundException("사용자를 찾을 수 없습니다.");
    }

    const teamIds = user.teamIds || [];
    return teamIds.map(id => db.teams.get(id)).filter(Boolean) as Team[];
  }

  getTeam(userId: string, teamId: string) {
    const team = db.teams.get(teamId);
    if (!team) {
      throw new NotFoundException("팀을 찾을 수 없습니다.");
    }

    if (!team.memberIds.includes(userId)) {
      throw new ForbiddenException("팀에 대한 접근 권한이 없습니다.");
    }

    return team;
  }

  async inviteMember(ownerId: string, teamId: string, payload: InviteMemberDto) {
    const team = this.getTeam(ownerId, teamId);
    
    if (team.ownerId !== ownerId) {
      throw new ForbiddenException("팀 관리자만 멤버를 초대할 수 있습니다.");
    }

    const user = db.findUserByEmail(payload.email);
    if (!user) {
      throw new NotFoundException("해당 이메일 사용자가 없습니다. 먼저 회원가입해야 합니다.");
    }

    if (team.memberIds.includes(user.id)) {
      return { message: "이미 팀 멤버입니다.", memberId: user.id };
    }

    team.memberIds.push(user.id);
    team.updatedAt = new Date().toISOString();

    // 사용자의 teamIds에 추가
    if (!user.teamIds) {
      user.teamIds = [];
    }
    user.teamIds.push(teamId);

    db.save();

    // 이메일 초대 전송
    const owner = db.users.get(ownerId);
    const ownerName = owner?.name || "사용자";
    const inviteLink = `${process.env.FRONTEND_URL || "http://localhost:3000"}/workspace?team=${teamId}`;
    
    await this.emailService.sendInviteEmail(
      payload.email,
      team.name,
      ownerName,
      inviteLink
    );

    return { memberId: user.id, message: "멤버가 초대되었습니다." };
  }

  removeMember(ownerId: string, teamId: string, memberId: string) {
    const team = this.getTeam(ownerId, teamId);
    
    if (team.ownerId !== ownerId) {
      throw new ForbiddenException("팀 관리자만 멤버를 제거할 수 있습니다.");
    }

    if (memberId === ownerId) {
      throw new ForbiddenException("팀 관리자는 제거할 수 없습니다.");
    }

    team.memberIds = team.memberIds.filter(id => id !== memberId);
    team.updatedAt = new Date().toISOString();

    // 사용자의 teamIds에서 제거
    const user = db.users.get(memberId);
    if (user && user.teamIds) {
      user.teamIds = user.teamIds.filter(id => id !== teamId);
    }

    db.save();
    return { message: "멤버가 제거되었습니다." };
  }
}

