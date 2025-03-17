import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const rabbitmq_host = configService.getOrThrow('RABBITMQ_HOST');
  const rabbitmq_port = configService.getOrThrow('RABBITMQ_PORT');

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [`amqp://${rabbitmq_host}:${rabbitmq_port}`],
      queue: 'auth_queue',
    },
  });

  const port = configService.getOrThrow('AUTH_PORT');

  await app.startAllMicroservices();
  await app.listen(port, '0.0.0.0');
  Logger.log(`✅ Auth service is running on http://localhost:${port}`);
}
bootstrap();
