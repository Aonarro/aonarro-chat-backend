import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { FileModule } from './file/file.module';
import { logger } from './config/logger/logger';

async function bootstrap() {
  const appContext = await NestFactory.createApplicationContext(FileModule, {
    logger: logger,
  });
  const configService = appContext.get(ConfigService);

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    FileModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [
          `amqp://${configService.getOrThrow('RABBITMQ_HOST')}:${configService.getOrThrow('RABBITMQ_PORT')}`,
        ],
        queue: 'file_queue',
      },
      logger: logger,
    },
  );

  await app.listen();
  Logger.log('✅ File service is running as a microservice');
}
bootstrap();
