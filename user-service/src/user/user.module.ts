import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RedisModule } from '../config/redis/redis.module';
import { SessionAuthGuard } from '../utils/guards/session-auth.guard';
import * as cookieParser from 'cookie-parser';
import { ProfileController } from './controllers/profile.controller';
import { ProfileService } from './services/profile.service';
import { PrismaModule } from '../config/prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    RedisModule,
    PrismaModule,
  ],
  controllers: [ProfileController],
  providers: [SessionAuthGuard, ProfileService],
})
export class UserModule implements NestModule {
  constructor() {}

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cookieParser()).forRoutes('*');
  }
}
