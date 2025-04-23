// presence.service.ts
import { Injectable } from '@nestjs/common';
import { RedisService } from 'src/config/redis/redis.service';
import { UserStatusEnum } from 'src/utils/types/types';

@Injectable()
export class PresenceService {
  constructor(private readonly redisService: RedisService) {}

  async setUserStatus(userId: string, status: UserStatusEnum) {
    if (status === UserStatusEnum.OFFLINE) {
      await this.redisService.del(`user:${userId}`);
    } else {
      await this.redisService.set(`user:${userId}`, status, 30);
    }
  }

  async getUserStatus(userId: string): Promise<UserStatusEnum | null> {
    const status = await this.redisService.get(`user:${userId}`);
    return status ? (status as UserStatusEnum) : null;
  }

  async isUserOnline(userId: string): Promise<boolean> {
    const status = await this.getUserStatus(userId);
    return status === UserStatusEnum.ONLINE;
  }
}
