import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Post } from './posts.model';

@Injectable()
export class PostService {
  constructor(@InjectModel('Post') private readonly postModel: Model<Post>) {}

  async insertPost(title: string, comment: string) {
    const newPost = new this.postModel({
      title,
      comment,
    });
    const result = await newPost.save();
    return result.id as string;
  }

  async getPosts() {
    const products = await this.postModel.find().exec();
    return products.map((post) => ({
      id: post.id,
      title: post.title,
      comment: post.comment,
    }));
  }

  async getSinglePost(postId: string) {
    const post = await this.findPost(postId);
    return {
      id: post.id,
      title: post.title,
      comment: post.comment,
    };
  }

  async updatePost(postId: string, title: string, comment: string) {
    const updatedPost = await this.findPost(postId);
    if (title) {
      updatedPost.title = title;
    }
    if (comment) {
      updatedPost.comment = comment;
    }
    updatedPost.save();
  }

  async deletePost(postId: string) {
    const result = await this.postModel.deleteOne({ _id: postId }).exec();
    if (!result) {
      throw new NotFoundException('Could not find post.');
    }
  }

  private async findPost(id: string): Promise<Post> {
    let post;
    try {
      post = await this.postModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find post.');
    }
    if (!post) {
      throw new NotFoundException('Could not find post.');
    }
    return post;
  }
}
