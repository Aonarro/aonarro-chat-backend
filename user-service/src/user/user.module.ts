import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RedisModule } from '../config/redis/redis.module';
import { SessionAuthGuard } from '../utils/guards/session-auth.guard';
import * as cookieParser from 'cookie-parser';
import { ProfileController } from './controllers/profile.controller';
import { ProfileService } from './services/profile.service';
import { PrismaModule } from '../config/prisma/prisma.module';
import { AuthService } from './services/auth.service';
import { RabbitMQModule } from 'src/config/rabbitmq/rabbitmq.module';
import { MulterModule } from '@nestjs/platform-express';
import { FileService } from './services/file.service';
import { FormDataJsonPipe } from 'src/utils/pipes/form-data-json.pipe';
import { UserController } from './controllers/user.controller';
import { FriendService } from './services/friend.service';
import { FriendController } from './controllers/friend.controller';
import { ElasticSearchModule } from 'src/config/elastic-search/elastic-search.module';
import { ElasticSearchService } from './services/elastic-search.service';

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
    ElasticSearchModule,
  ],
  controllers: [ProfileController, UserController, FriendController],
  providers: [
    SessionAuthGuard,
    ProfileService,
    AuthService,
    FileService,
    FormDataJsonPipe,
    FriendService,
    ElasticSearchService,
  ],
})
export class UserModule implements NestModule {
  constructor() {}

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cookieParser()).forRoutes('*');
  }
}
