import { Injectable, UnauthorizedException } from "@nestjs/common";
import { randomUUID } from "node:crypto";
import { SignupDto } from "./dto/signup.dto.js";
import { LoginDto } from "./dto/login.dto.js";
import { db } from "../../storage/database.js";

@Injectable()
export class AuthService {
  private sessions = new Map<string, string>(); // token -> userId

  signup(payload: SignupDto) {
    const { user, page } = db.createUser(payload);
    const token = randomUUID();
    this.sessions.set(token, user.id);

    return {
      token,
      user: this.serializeUser(user),
      personalPage: page
    };
  }

  login(payload: LoginDto) {
    const user = db.findUserByEmail(payload.email);

    if (!user || user.password !== payload.password) {
      throw new UnauthorizedException("이메일 또는 비밀번호가 올바르지 않습니다.");
    }

    const token = randomUUID();
    this.sessions.set(token, user.id);

    return {
      token,
      user: this.serializeUser(user)
    };
  }

  authenticate(token: string | undefined) {
    if (!token) {
      throw new UnauthorizedException("인증 토큰이 필요합니다.");
    }

    const userId = this.sessions.get(token);
    if (!userId) {
      throw new UnauthorizedException("유효하지 않은 토큰입니다.");
    }

    const user = db.users.get(userId);
    if (!user) {
      throw new UnauthorizedException("사용자를 찾을 수 없습니다.");
    }

    return user;
  }

  async imwebLogin(payload: { email: string; name: string; imwebId?: string }) {
    try {
      // 데이터베이스에서 사용자 찾기 또는 생성
      let user = db.findUserByEmail(payload.email);

      if (!user) {
        // 새 사용자 생성 (Imweb 로그인이므로 비밀번호는 랜덤 생성)
        const { user: newUser } = db.createUser({
          email: payload.email,
          name: payload.name || payload.email.split('@')[0],
          password: randomUUID(), // Imweb 로그인이므로 비밀번호 불필요
        });
        user = newUser;
      }

      // 세션 토큰 생성
      const token = randomUUID();
      this.sessions.set(token, user.id);

      return {
        token,
        user: this.serializeUser(user),
      };
    } catch (error) {
      console.error('Imweb 로그인 오류:', error);
      throw new UnauthorizedException('Imweb 로그인에 실패했습니다.');
    }
  }

  private serializeUser(user: { id: string; email: string; name: string; personalPageId: string; password?: string }) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...safe } = user;
    return safe;
  }
}
