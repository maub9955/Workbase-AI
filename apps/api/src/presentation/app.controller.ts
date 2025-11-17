import { Controller, Get } from "@nestjs/common";
import { AppService } from "../services/app.service.js";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("health")
  health() {
    return this.appService.getHealth();
  }
}
