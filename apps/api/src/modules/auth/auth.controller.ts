import { Body, Controller, Inject, Post } from "@nestjs/common";
import { AuthService } from "./auth.service.js";
import { SignupDto } from "./dto/signup.dto.js";
import { LoginDto } from "./dto/login.dto.js";

@Controller("auth")
export class AuthController {
  constructor(@Inject(AuthService) private readonly authService: AuthService) {}

  @Post("signup")
  signup(@Body() payload: SignupDto) {
    return this.authService.signup(payload);
  }

  @Post("login")
  login(@Body() payload: LoginDto) {
    return this.authService.login(payload);
  }

  @Post("imweb")
  async imwebLogin(@Body() payload: { email: string; name: string; imwebId?: string }) {
    return this.authService.imwebLogin(payload);
  }
}
