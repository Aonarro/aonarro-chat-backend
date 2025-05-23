import { TokenService } from '@/auth/services/token.service';
import {
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
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

  parseRpcError(error: any) {
    if (error && error.code && error.message && error.status) {
      const { code, message, status } = error;

      switch (code) {
        case 'USERNAME_EXISTS':
        case 'EMAIL_EXISTS':
        case 'AVATAR_UPLOAD_FAILED':
        case 'EMAIL_CHANGING_FAILED':
        case 'PROFILE_FETCHING_FAILED':
          throw new ConflictException({
            message: message || 'Conflict error',
            error: code,
            statusCode: status || 409,
          });

        default:
          throw new InternalServerErrorException({
            message: message || 'Internal server error',
            error: code || 'INTERNAL_ERROR',
            statusCode: status || 500,
          });
      }
    }

    throw new InternalServerErrorException({
      message: 'Unknown error format',
      error: 'INTERNAL_ERROR',
      statusCode: 500,
    });
  }
}
