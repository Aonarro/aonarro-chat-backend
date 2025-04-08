import { Inject, Injectable } from '@nestjs/common';

import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class UserService {
  constructor(
    @Inject('AUTH_SERVICE') private readonly userClient: ClientProxy,
  ) {}

  async getUserData(userId: string) {
    const userData = await firstValueFrom(
      this.userClient.send('get_user_email', { userId }),
    );
    return userData;
  }
}
