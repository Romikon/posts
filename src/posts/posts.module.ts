import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { PostsController } from './posts.controller';
import { PostService } from './posts.service';
import { PostSchema } from './posts.model';
import { NatsModule } from 'src/nats/nats.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Post', schema: PostSchema }]),
    NatsModule,
  ],
  controllers: [PostsController],
  providers: [PostService],
})
export class PostModule {}
