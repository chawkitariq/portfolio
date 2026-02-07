import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PostService } from './post.service';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';

@Resolver('Post')
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Mutation('createPost')
  create(@Args('input') input: CreatePostInput) {
    return this.postService.create(input);
  }

  @Query('post')
  findAll() {
    return this.postService.findAll();
  }

  @Query('postOne')
  findOne(@Args('id') id: number) {
    return this.postService.findOne(id);
  }

  @Mutation('updatePost')
  update(@Args('input') input: UpdatePostInput) {
    return this.postService.update(input.id, input);
  }

  @Mutation('removePost')
  remove(@Args('id') id: number) {
    return this.postService.remove(id);
  }
}
