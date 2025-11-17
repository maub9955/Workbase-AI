import { IsString, MinLength } from "class-validator";

export class AddEntryDto {
  @IsString()
  @MinLength(1)
  content!: string;
}
