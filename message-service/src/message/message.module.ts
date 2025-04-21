import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from 'src/config/prisma/prisma.module';
import { RabbitMQModule } from 'src/config/rabbitmq/rabbitmq.module';
import { RedisModule } from 'src/config/redis/redis.module';
import { MessageController } from './controller/message.controller';
import { MessageService } from './service/message.service';

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
  providers: [MessageService],
})
export class MessageModule {}
