import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class CreatePostInput {
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  title!: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  summary!: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  content!: string;
}
