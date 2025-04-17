import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';

@Injectable()
export class UtilityFunctions {
  constructor() {}

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
