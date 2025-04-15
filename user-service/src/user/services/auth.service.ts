import { Inject, Injectable, Logger } from '@nestjs/common';

import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    @Inject('AUTH_SERVICE') private readonly authClient: ClientProxy,
  ) {}

  async changeUserEmail(userId: string, newEmail: string) {
    this.logger.log(
      `Dispatching message to RabbitMQ to change email for userId: ${userId}`,
    );
    const userData = await firstValueFrom(
      this.authClient.send('change_user_email', { userId, newEmail }),
    );
    return userData;
  }
}
