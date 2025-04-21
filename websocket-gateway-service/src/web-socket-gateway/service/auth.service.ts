import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { RedisService } from '../../config/redis/redis.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly redisClient: RedisService,
    private readonly configService: ConfigService,
  ) {}

  async validateSession(sessionId: string): Promise<any> {
    if (!sessionId) {
      throw new UnauthorizedException('Session ID not found');
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
      this.logger.error('Failed to parse session data', error);
      throw new UnauthorizedException('Failed to parse session data');
    }

    const userId = parsedSessionData.passport?.user;
    if (!userId) {
      throw new UnauthorizedException('User ID not found in session');
    }

    return userId;
  }
}
