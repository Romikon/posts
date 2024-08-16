import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { HealthModule } from './health';
import { NatsModule } from './nats/nats.module';
import { ConfigModule } from '@nestjs/config';
import { NatsConfig, ServerConfig } from './config';
import { PostModule } from './posts/posts.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/products'),
    HealthModule,
    NatsModule,
    PostModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [NatsConfig, ServerConfig],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
