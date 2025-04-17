import { Inject, Injectable, Logger } from '@nestjs/common';

import { ClientProxy } from '@nestjs/microservices';
import { catchError, firstValueFrom, timeout } from 'rxjs';
import { UtilityFunctions } from 'src/utils/functions/UtilityFunctions';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    @Inject('AUTH_SERVICE') private readonly authClient: ClientProxy,
    private readonly utilityFunctions: UtilityFunctions,
  ) {}

  async changeUserEmail(userId: string, newEmail: string) {
    try {
      this.logger.log(
        `Dispatching message to RabbitMQ to change email for userId: ${userId}`,
      );
      const userData = await firstValueFrom(
        this.authClient.send('change_user_email', { userId, newEmail }).pipe(
          timeout(5000),
          catchError((error) => {
            throw error;
          }),
        ),
      );
      return userData;
    } catch (error) {
      this.logger.error(
        `Error while changing email for userId: ${userId}`,
        error.stack,
      );
      this.utilityFunctions.parseRpcError(error);
    }
  }
}
