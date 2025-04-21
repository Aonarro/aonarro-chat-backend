import { NestFactory } from '@nestjs/core';
import { WebSocketModule } from './web-socket-gateway/websocket-gateway.module';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { logger } from './config/logger/logger';

async function bootstrap() {
  const app = await NestFactory.create(WebSocketModule, { logger: logger });
  const configService = app.get(ConfigService);

  const rabbitmqHost = configService.getOrThrow('RABBITMQ_HOST');
  const rabbitmqPort = configService.getOrThrow('RABBITMQ_PORT');

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [`amqp://${rabbitmqHost}:${rabbitmqPort}`],
      queue: 'ws_gateway_queue',
    },
  });

  const port = configService.getOrThrow('WEBSOCKET_GATEWAY_PORT');
  await app.startAllMicroservices();
  await app.listen(port, '0.0.0.0');
  Logger.log('✅ Chat service is running as a microservice');
}
bootstrap();
