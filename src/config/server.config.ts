import * as process from 'process';
import { registerAs } from '@nestjs/config';

export enum EEnvironment {
  Development = 'development',
  Production = 'production',
}

export interface IServerConfig {
  port: number;
}

export const ServerConfig = registerAs('server', () => ({
  port: parseInt(process.env.NODE_PORT) ?? 3000,
  nodeEnv: process.env.NODE_ENV || EEnvironment.Production,
}));
