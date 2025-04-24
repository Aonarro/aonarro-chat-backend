// presence.service.ts
import { Injectable } from '@nestjs/common';
import { RedisService } from 'src/config/redis/redis.service';
import { UserStatusEnum } from '../../utils/types/types';

@Injectable()
export class PresenceService {
  constructor(private readonly redisService: RedisService) {}

  async getUsersStatuses(
    userIds: string[],
  ): Promise<Map<string, 'online' | 'offline' | null>> {
    const keys = userIds.map((id) => `user:${id}`);
    const statuses = keys.length ? await this.redisService.mget(...keys) : [];

    const map = new Map<string, 'online' | 'offline' | null>();
    userIds.forEach((userId, idx) => {
      const status = statuses[idx] as 'online' | 'offline' | null;
      map.set(userId, status);
    });

    return map;
  }

  async getUserStatus(userId: string): Promise<UserStatusEnum | null> {
    const status = await this.redisService.get(`user:${userId}`);
    return status ? (status as UserStatusEnum) : null;
  }
}
