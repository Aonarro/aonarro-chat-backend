import { Injectable } from '@nestjs/common';
import { RedisService } from 'src/config/redis/redis.service';
import { UserStatusEnum } from 'src/utils/types/types';

@Injectable()
export class PresenceService {
  constructor(private readonly redisService: RedisService) {}

  private getUserSocketsKey(userId: string) {
    return `user:${userId}:sockets`;
  }

  private getUserStatusKey(userId: string) {
    return `user:${userId}`;
  }

  async addUserSocket(userId: string, socketId: string) {
    const socketsKey = this.getUserSocketsKey(userId);
    const userStatusKey = this.getUserStatusKey(userId);

    await this.redisService.sadd(socketsKey, socketId);
    await this.redisService.expire(socketsKey, 60);
    await this.redisService.set(userStatusKey, UserStatusEnum.ONLINE, 30);
  }

  async removeUserSocket(userId: string, socketId: string) {
    const key = this.getUserSocketsKey(userId);

    await this.redisService.srem(key, socketId);

    const socketCount = await this.redisService.scard(key);

    if (socketCount === 0) {
      await this.redisService.del(this.getUserSocketsKey(userId));
      await this.setUserStatusOffline(userId, UserStatusEnum.OFFLINE);
    }
  }

  async setUserStatusOffline(userId: string, status: UserStatusEnum) {
    if (status === UserStatusEnum.OFFLINE) {
      await this.redisService.del(this.getUserStatusKey(userId));
    }
  }

  async refreshUserTTL(userId: string, socketId: string) {
    const userStatusKey = this.getUserStatusKey(userId);
    const userSocketsKey = this.getUserSocketsKey(userId);

    const userStatusExists = await this.redisService.exists(userStatusKey);
    const userSocketsExists = await this.redisService.exists(userSocketsKey);

    if (!userStatusExists) {
      await this.redisService.set(userStatusKey, UserStatusEnum.ONLINE, 30);
    } else {
      await this.redisService.expire(userStatusKey, 30);
    }

    if (!userSocketsExists) {
      await this.redisService.sadd(userSocketsKey, socketId);
    }
    await this.redisService.expire(userSocketsKey, 60);
  }

  async getUserStatus(userId: string): Promise<UserStatusEnum | null> {
    const userStatusKey = this.getUserStatusKey(userId);
    const status = await this.redisService.get(userStatusKey);
    return status ? (status as UserStatusEnum) : null;
  }

  async isUserOnline(userId: string): Promise<boolean> {
    const status = await this.getUserStatus(userId);
    return status === UserStatusEnum.ONLINE;
  }
}
