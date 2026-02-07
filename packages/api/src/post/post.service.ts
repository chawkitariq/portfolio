import { Injectable } from '@nestjs/common';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostEntity } from './entities/post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
  ) {}

  create(input: CreatePostInput) {
    const post = this.postRepository.create(input);
    return this.postRepository.save(post);
  }

  findAll() {
    return this.postRepository.find();
  }

  findOne(id: number) {
    return this.postRepository.findOneBy({ id });
  }

  update(id: number, input: UpdatePostInput) {
    return this.postRepository.update(id, input);
  }

  remove(id: number) {
    return this.postRepository.delete(id);
  }
}
