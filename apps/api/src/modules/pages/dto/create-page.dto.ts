import { IsString, IsOptional, MinLength } from "class-validator";

export class CreatePageDto {
  @IsString()
  @MinLength(1)
  title!: string;

  @IsOptional()
  @IsString()
  parentPageId?: string;
}
