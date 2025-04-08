import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RedisModule } from '../config/redis/redis.module';
import { SessionAuthGuard } from '../utils/guards/session-auth.guard';
import * as cookieParser from 'cookie-parser';
import { ProfileController } from './controllers/profile.controller';
import { ProfileService } from './services/profile.service';
import { PrismaModule } from '../config/prisma/prisma.module';
import { UserService } from './services/user.service';
import { RabbitMQModule } from 'src/config/rabbitmq/rabbitmq.module';
import { MulterModule } from '@nestjs/platform-express';
import { FileService } from './services/file.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    RedisModule,
    RabbitMQModule,
    PrismaModule,
    MulterModule.register({
      limits: {
        fileSize: 5 * 1024 * 1024,
      },
    }),
  ],
  controllers: [ProfileController],
  providers: [SessionAuthGuard, ProfileService, UserService, FileService],
})
export class UserModule implements NestModule {
  constructor() {}

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cookieParser()).forRoutes('*');
  }
}
