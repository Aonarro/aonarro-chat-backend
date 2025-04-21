import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RedisModule } from 'src/config/redis/redis.module';
import { ChatService } from './service/chat.service';
import { ChatController } from './controller/chat.controller';
import { UserService } from './service/user.service';
import { PrismaModule } from 'src/config/prisma/prisma.module';
import { RabbitMQModule } from 'src/config/rabbitmq/rabbitmq.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    RedisModule,
    PrismaModule,
    RabbitMQModule,
  ],
  controllers: [ChatController],
  providers: [ChatService, UserService],
})
export class ChatModule {}
