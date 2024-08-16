// Must be before each imports
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
import * as process from 'process';
import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { graphqlUploadExpress } from 'graphql-upload-minimal';
import { AppModule } from './app.module';
import { INatsConfig, IServerConfig } from './config';
import { parseBool } from './utils';

async function bootstrap() {
  const app: INestApplication = await NestFactory.create(AppModule, {
    cors: {
      origin:
        parseBool(process.env.CORS_ORIGIN) ??
        (process.env.CORS_ORIGIN?.trim() || true),
      methods: process.env.CORS_METHODS || '*',
      preflightContinue:
        parseBool(process.env.CORS_PREFLIGHT_CONTINUE) ?? false,
      optionsSuccessStatus:
        parseInt(process.env.CORS_OPTIONS_SUCCESS_STATUS) || 204,
    },
  });

  const config = app.get(ConfigService);

  app.use('/graphql', graphqlUploadExpress());

  app.getHttpAdapter().getInstance().disable('x-powered-by');

  // Http
  const port = config.getOrThrow<IServerConfig>('server').port;
  await app.listen(port, () => console.log(`http://localhost:${port}`));

  runMicroservice(app, config).then();
}
bootstrap().then();

async function runMicroservice(
  app: INestApplication,
  config: ConfigService,
): Promise<INestApplication> {
  // Config Microservices
  // Nats
  const natsConfig = config.getOrThrow<INatsConfig>('nats');
  console.log(`Starting NATS Microservice...`);
  app.connectMicroservice(natsConfig, { inheritAppConfig: true });

  return app.startAllMicroservices();
}
