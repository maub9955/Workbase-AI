import { IsString, IsEnum, IsOptional, IsObject } from "class-validator";

export enum BlockType {
  TEXT = "text",
  HEADING_1 = "heading_1",
  HEADING_2 = "heading_2",
  HEADING_3 = "heading_3",
  BULLET_LIST = "bullet_list",
  NUMBERED_LIST = "numbered_list",
  TOGGLE = "toggle",
  CALENDAR = "calendar",
  FILE = "file"
}

export class CreateBlockDto {
  @IsEnum(BlockType)
  type!: BlockType;

  @IsOptional()
  @IsString()
  parentBlockId?: string;

  @IsOptional()
  @IsObject()
  props?: Record<string, unknown>;
}
