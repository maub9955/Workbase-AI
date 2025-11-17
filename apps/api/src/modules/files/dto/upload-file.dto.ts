import { IsString, IsNumber, IsOptional } from "class-validator";

export class UploadFileDto {
  @IsString()
  filename!: string;

  @IsNumber()
  size!: number;

  @IsString()
  mimeType!: string;

  @IsOptional()
  @IsString()
  pageId?: string;
}
