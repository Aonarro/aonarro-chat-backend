import { Inject, Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService {
  constructor(@Inject('REDIS_CLIENT') private readonly redisClient: Redis) {}

  async set(key: string, value: string, ttl?: number) {
    await this.redisClient.set(key, value);
    if (ttl) {
      await this.redisClient.expire(key, ttl);
    }
  }

  async get(key: string): Promise<string | null> {
    return this.redisClient.get(key);
  }

  async del(key: string): Promise<void> {
    await this.redisClient.del(key);
  }

  async sadd(key: string, member: string, ttl?: number) {
    await this.redisClient.sadd(key, member);
    if (ttl) {
      await this.redisClient.expire(key, ttl);
    }
  }

  async srem(key: string, member: string) {
    return this.redisClient.srem(key, member);
  }

  async scard(key: string): Promise<number> {
    return this.redisClient.scard(key);
  }

  async exists(key: string): Promise<boolean> {
    const result = await this.redisClient.exists(key);
    return result === 1;
  }

  async expire(key: string, seconds: number): Promise<number> {
    return this.redisClient.expire(key, seconds);
  }
}
