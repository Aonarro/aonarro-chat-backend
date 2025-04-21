import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { logger } from './config/logger/logger';

async function bootstrap() {
  const appContext = await NestFactory.createApplicationContext(AppModule, {
    logger: logger,
  });
  const configService = appContext.get(ConfigService);

  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [
        `amqp://${configService.getOrThrow('RABBITMQ_HOST')}:${configService.getOrThrow('RABBITMQ_PORT')}`,
      ],
      queue: 'notifications_queue',
    },
    logger: logger,
  });

  await app.listen();
  Logger.log('✅ Mail Service is running and listening for messages');
}
bootstrap();
