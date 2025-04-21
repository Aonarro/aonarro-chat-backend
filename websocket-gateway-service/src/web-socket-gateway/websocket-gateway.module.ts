import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { ChatGateway } from './gateway/chat.gateway';
import { PresenceService } from './service/presence.service';
import { RabbitMQModule } from 'src/config/rabbitmq/rabbitmq.module';
import { RedisModule } from 'src/config/redis/redis.module';
import { AuthService } from './service/auth.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    RabbitMQModule,
    RedisModule,
  ],
  controllers: [],
  providers: [ChatGateway, PresenceService, AuthService],
})
export class WebSocketModule {}
