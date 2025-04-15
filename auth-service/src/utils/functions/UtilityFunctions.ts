import { TokenService } from '@/auth/services/token.service';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { TokenType } from '@prisma/__generated__';

@Injectable()
export class UtilityFunctions {
  constructor(
    private readonly tokenService: TokenService,
    @Inject('NOTIFICATION_SERVICE')
    private readonly notificationClient: ClientProxy,
  ) {}

  public async handleUnverifiedEmail(email: string) {
    const existingToken = await this.tokenService.findTokenByEmail(email);

    if (existingToken) {
      return {
        message:
          'Please check your inbox (including the "Spam" folder). If you haven’t received the email, try requesting the code again in a few minutes.',
        verifyEmail: true,
      };
    }

    const token = await this.tokenService.generateToken(
      email,
      TokenType.VERIFICATION,
      15,
    );

    this.notificationClient.emit('send_verification_email', { email, token });

    return null;
  }
}
