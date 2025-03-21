import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { RedisService } from '../../config/redis/redis.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SessionAuthGuard implements CanActivate {
  constructor(
    private readonly redisClient: RedisService,
    private readonly configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const sessionId = request.cookies['session']
      .split('.')[0]
      ?.replace(/^s:/, '');

    if (!sessionId) {
      return false;
    }

    console.log(sessionId);
    const redisPrefix = this.configService.getOrThrow('SESSION_PREFIX');
    const redisKey = `${redisPrefix}${sessionId}`;

    const sessionData = await this.redisClient.get(redisKey);
    if (!sessionData) {
      return false;
    }

    const parsedSessionData = JSON.parse(sessionData);

    console.log('SESSIONDATA: ', parsedSessionData);

    const userId = parsedSessionData.passport?.user;
    if (!userId) {
      return false;
    }

    console.log('USERID: ', userId);

    request.userId = userId;
    return true;
  }
}
