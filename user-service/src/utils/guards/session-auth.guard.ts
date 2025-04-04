import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { RedisService } from '../../config/redis/redis.service';
import { ConfigService } from '@nestjs/config';
import { logger } from '../../config/logger/logger';

@Injectable()
export class SessionAuthGuard implements CanActivate {
  constructor(
    private readonly redisClient: RedisService,
    private readonly configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const sessionCookie = request.cookies['session'];
    if (!sessionCookie) {
      throw new UnauthorizedException('Session cookie not found');
    }

    const sessionId = sessionCookie.startsWith('s:')
      ? sessionCookie.slice(2).split('.')[0]
      : sessionCookie.split('.')[0];

    if (!sessionId) {
      throw new UnauthorizedException('Invalid session format');
    }

    const redisPrefix = this.configService.getOrThrow('SESSION_PREFIX');
    const redisKey = `${redisPrefix}${sessionId}`;

    const sessionData = await this.redisClient.get(redisKey);
    if (!sessionData) {
      throw new UnauthorizedException('Session not found in Redis');
    }

    let parsedSessionData;
    try {
      parsedSessionData = JSON.parse(sessionData);
    } catch (error) {
      logger.error('Failed to parse session data', error, 'SessionAuthGuard');
      throw new UnauthorizedException('Failed to parse session data');
    }

    const userId = parsedSessionData.passport?.user;
    if (!userId) {
      throw new UnauthorizedException('User ID not found in session');
    }

    request.userId = userId;
    return true;
  }
}
