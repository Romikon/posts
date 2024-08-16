import { Injectable } from '@nestjs/common';
import { BaseClient } from '../base.client';
import { natsRoute } from '../nats.helper';
import { Payload } from '@nestjs/microservices';

@Injectable()
export class UserServiceClient extends BaseClient {
  async getUserById(@Payload() data: { userId: string }): Promise<any> {
    console.log(data);
    const a = await this.send<any, any>(
      natsRoute('ShopApp', 'getUserById'),
      data,
    );
    console.log(a);
    return a;
  }
}
