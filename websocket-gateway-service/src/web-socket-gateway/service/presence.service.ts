// presence.service.ts
import { Injectable } from '@nestjs/common';
import { RedisService } from 'src/config/redis/redis.service';

@Injectable()
export class PresenceService {
  constructor(private readonly redisService: RedisService) {}

  async setUserOnline(userId: string) {
    await this.redisService.set(`user:${userId}`, 'online', 30);
  }

  async setUserOffline(userId: string) {
    await this.redisService.del(`user:${userId}`);
  }

  async setUserIsIdle(userId: string) {
    await this.redisService.set(`user:${userId}`, 'idle', 30);
  }

  async isUserOnline(userId: string): Promise<boolean> {
    const status = await this.redisService.get(`user:${userId}`);
    return status === 'online';
  }
}
