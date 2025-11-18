import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import { Logger, ValidationPipe } from "@nestjs/common";
import { AppModule } from "./modules/app.module.js";
import { AllExceptionsFilter } from "./common/filters/http-exception.filter.js";
import { initializeDatabase } from "./storage/database.js";

async function bootstrap() {
  // 데이터베이스 초기화 (PostgreSQL이 설정되어 있으면 사용)
  await initializeDatabase();
  
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true
  });

  app.setGlobalPrefix("api");
  
  // CORS 설정: 환경 변수로 허용된 도메인 설정, 없으면 모든 도메인 허용
  const allowedOrigins = process.env.ALLOWED_ORIGINS 
    ? process.env.ALLOWED_ORIGINS.split(',').map(origin => origin.trim())
    : ['*'];
  
  app.enableCors({ 
    origin: allowedOrigins.includes('*') ? true : allowedOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-user-token']
  });
  
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true }
    })
  );

  const port = process.env.PORT ?? "4000";
  await app.listen(port);
  Logger.log(`API server running at http://localhost:${port}/api`, "Bootstrap");
}

bootstrap();
