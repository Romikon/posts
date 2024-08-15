import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientsModule } from '@nestjs/microservices';
import { INatsConfig } from '../config';
import { BaseClient } from './nats.client';

@Module({
  imports: [
    ClientsModule.registerAsync({
      clients: [
        {
          name: 'nats',
          inject: [ConfigService],
          useFactory: (config: ConfigService): INatsConfig =>
            config.getOrThrow<INatsConfig>('nats'),
        },
      ],
    }),
  ],
  providers: [BaseClient],
  exports: [BaseClient],
})
export class NatsModule {}
