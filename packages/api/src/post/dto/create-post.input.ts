import {
  IsDefined,
  IsISO8601,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreatePostInput {
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  title!: string;

  @IsString()
  @IsOptional()
  thumbnailUrl?: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  summary!: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  content!: string;

  @IsDefined()
  @IsISO8601()
  publishedAt: Date;
}
