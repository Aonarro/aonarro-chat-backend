import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AuthModule } from './auth/auth.module';
import { logger } from './config/logger/logger';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule, { logger: logger });

  const configService = app.get(ConfigService);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  const rabbitmqHost = configService.getOrThrow('RABBITMQ_HOST');
  const rabbitmqPort = configService.getOrThrow('RABBITMQ_PORT');

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [`amqp://${rabbitmqHost}:${rabbitmqPort}`],
      queue: 'auth_queue',
    },
  });

  console.log('Goode morning');

  const port = configService.getOrThrow('AUTH_PORT');

  await app.startAllMicroservices();
  await app.listen(port, '0.0.0.0');
  Logger.log(`✅ Auth service is running on http://localhost:${port}`);
}
bootstrap();
