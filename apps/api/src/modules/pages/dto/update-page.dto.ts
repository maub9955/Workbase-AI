import { IsString, IsOptional, MinLength } from "class-validator";

export class UpdatePageDto {
  @IsOptional()
  @IsString()
  @MinLength(1)
  title?: string;

  @IsOptional()
  @IsString()
  parentPageId?: string;

  @IsOptional()
  @IsString()
  icon?: string;
}
