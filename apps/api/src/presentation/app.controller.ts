import { Controller, Get, HttpCode, HttpStatus } from "@nestjs/common";
import { AppService } from "../services/app.service.js";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("health")
  health() {
    return this.appService.getHealth();
  }

  @Get("favicon.ico")
  @HttpCode(HttpStatus.NO_CONTENT)
  favicon() {
    return;
  }
}
