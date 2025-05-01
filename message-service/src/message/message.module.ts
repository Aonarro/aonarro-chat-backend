import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from 'src/config/prisma/prisma.module';
import { RabbitMQModule } from 'src/config/rabbitmq/rabbitmq.module';
import { RedisModule } from 'src/config/redis/redis.module';
import { MessageController } from './controller/message.controller';
import { MessageService } from './service/message.service';
import { ChatService } from './service/chat.service';
import { UserService } from './service/user.service';
import { FileService } from './service/file.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    RedisModule,
    PrismaModule,
    RabbitMQModule,
  ],
  controllers: [MessageController],
  providers: [MessageService, ChatService, UserService, FileService],
})
export class MessageModule {}
