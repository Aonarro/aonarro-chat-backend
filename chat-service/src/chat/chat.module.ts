import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RedisModule } from 'src/config/redis/redis.module';
import { ChatService } from './service/chat.service';
import { ChatController } from './controller/chat.controller';
import { UserService } from './service/user.service';
import { PrismaModule } from 'src/config/prisma/prisma.module';
import { RabbitMQModule } from 'src/config/rabbitmq/rabbitmq.module';
import { PresenceService } from './service/presence.service';
import { MessageController } from './controller/message.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    RedisModule,
    PrismaModule,
    RabbitMQModule,
  ],
  controllers: [ChatController, MessageController],
  providers: [ChatService, UserService, PresenceService],
})
export class ChatModule {}
