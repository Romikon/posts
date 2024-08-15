import * as process from 'process';
import { registerAs } from '@nestjs/config';
import { NatsOptions, Transport } from '@nestjs/microservices';
import { tokenAuthenticator } from 'nats';
import { parseBool } from '../utils';

export type INatsConfig = Required<NatsOptions>;

const configData: INatsConfig = {
  transport: Transport.NATS,
  options: {
    authenticator: tokenAuthenticator(process.env.NATS_TOKEN),
    servers: [`nats://${process.env.NATS_HOST}:${process.env.NATS_PORT}`],
    timeout: (parseInt(process.env.NATS_TIMEOUT) || 10) * 1000,
    waitOnFirstConnect: true,
    reconnect: parseBool(process.env.NATS_RECONNECT),
    reconnectTimeWait:
      (parseInt(process.env.NATS_RECONNECT_TIMEOUT) || 30) * 1000,
    maxReconnectAttempts: parseInt(process.env.NATS_RECONNECT_MAX) || -1,
  },
};

export const NatsConfig = registerAs<INatsConfig>(
  'nats',
  (): INatsConfig => configData,
);
