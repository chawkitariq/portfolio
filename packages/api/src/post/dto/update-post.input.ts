import { IsDefined, IsNumber } from 'class-validator';
import { CreatePostInput } from './create-post.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdatePostInput extends PartialType(CreatePostInput) {
  @IsDefined()
  @IsNumber()
  id!: number;
}
