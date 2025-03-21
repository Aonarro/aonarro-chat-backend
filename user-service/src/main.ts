import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { UserModule } from './user/user.module';

async function bootstrap() {
  const app = await NestFactory.create(UserModule);

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
      queue: 'user_queue',
    },
  });

  const port = configService.getOrThrow('USER_PORT');
  await app.startAllMicroservices();
  await app.listen(port, '0.0.0.0');

  Logger.log(`✅ User service is running on http://localhost:${port}`);
}
bootstrap();
