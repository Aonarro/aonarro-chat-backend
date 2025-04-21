import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';

import { logger } from './config/logger/logger';
import { MessageModule } from './message/message.module';
import { ConfigService } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const appContext = await NestFactory.createApplicationContext(MessageModule, {
    logger: logger,
  });
  const configService = appContext.get(ConfigService);

  const app = await NestFactory.createMicroservice(MessageModule, {
    transport: Transport.RMQ,
    options: {
      urls: [
        `amqp://${configService.getOrThrow('RABBITMQ_HOST')}:${configService.getOrThrow('RABBITMQ_PORT')}`,
      ],
      queue: 'message_queue',
    },
    logger: logger,
  });

  await app.listen();
  Logger.log('✅ Message Service is running and listening for messages');
}
bootstrap();
