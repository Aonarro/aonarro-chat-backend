import { NestFactory } from '@nestjs/core';
import { FileModule } from './file.module';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const appContext = await NestFactory.createApplicationContext(FileModule);
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
    },
  );

  await app.listen();
  Logger.log('✅ File service is running as a microservice');
}
bootstrap();
