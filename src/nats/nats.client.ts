import { Inject, Injectable } from '@nestjs/common';
import { ClientNats } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class BaseClient {
  constructor(@Inject('nats') private client: ClientNats) {}

  async send<T, R>(pattern: string, data: T): Promise<R> {
    return firstValueFrom<R>(this.client.send<R, T>(pattern, data));
  }

  async emit<T, R>(pattern: string, data: T): Promise<R> {
    return firstValueFrom<R>(this.client.emit<R, T>(pattern, data));
  }
}
