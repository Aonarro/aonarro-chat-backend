import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';
import { logger } from './config/logger/logger';
import { ChatModule } from './chat/chat.module';

async function bootstrap() {
  const appContext = await NestFactory.createApplicationContext(ChatModule, {
    logger: logger,
  });
  const configService = appContext.get(ConfigService);

  const app = await NestFactory.createMicroservice(ChatModule, {
    transport: Transport.RMQ,
    options: {
      urls: [
        `amqp://${configService.getOrThrow('RABBITMQ_HOST')}:${configService.getOrThrow('RABBITMQ_PORT')}`,
      ],
      queue: 'chat_queue',
    },
    logger: logger,
  });

  await app.listen();
  Logger.log('✅ Chat Service is running and listening for messages');
}
bootstrap();
