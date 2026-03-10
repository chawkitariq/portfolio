import { Injectable } from '@nestjs/common';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThanOrEqual, Repository } from 'typeorm';
import { PostEntity } from './entities/post.entity';

const WORDS_PER_MINUTE = 200;

function computeReadDuration(html: string): number {
  const text = html.replace(/<[^>]+>/g, ' ');
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
  ) {}

  create(input: CreatePostInput) {
    const post = this.postRepository.create({
      ...input,
      readDuration: computeReadDuration(input.content),
    });
    return this.postRepository.save(post);
  }

  findAllPublished() {
    return this.postRepository.findBy({
      publishedAt: LessThanOrEqual(new Date()),
    });
  }

  findAll() {
    return this.postRepository.find();
  }

  findOnePublished(id: number) {
    return this.postRepository.findOneBy({
      id,
      publishedAt: LessThanOrEqual(new Date()),
    });
  }

  findOne(id: number) {
    return this.postRepository.findOneBy({ id });
  }

  update(id: number, input: UpdatePostInput) {
    const extra: Partial<PostEntity> = {};
    if (input.content) {
      extra.readDuration = computeReadDuration(input.content);
    }
    return this.postRepository.update(id, { ...input, ...extra });
  }

  remove(id: number) {
    return this.postRepository.delete(id);
  }
}
