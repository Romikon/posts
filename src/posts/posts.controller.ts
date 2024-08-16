import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';

import { PostService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostService) {}

  @Post()
  async addPost(
    @Body('title') postTitle: string,
    @Body('comment') postComment: string,
  ) {
    const generatedId = await this.postsService.insertPost(
      postTitle,
      postComment,
    );
    return { id: generatedId };
  }

  @Get()
  async getAllPosts() {
    const posts = await this.postsService.getPosts();
    return posts;
  }

  @Get(':id')
  getPost(@Param('id') postId: string) {
    return this.postsService.getSinglePost(postId);
  }

  @Patch(':id')
  async updatePost(
    @Param('id') postId: string,
    @Body('title') postTitle: string,
    @Body('comment') postComment: string,
  ) {
    await this.postsService.updatePost(postId, postTitle, postComment);
    return null;
  }

  @Delete(':id')
  async removePost(@Param('id') postId: string) {
    await this.postsService.deletePost(postId);
    return null;
  }
}
