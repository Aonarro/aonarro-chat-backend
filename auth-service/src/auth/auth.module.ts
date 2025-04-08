import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import * as passport from 'passport';
import { RedisStore } from 'connect-redis';
import IORedis from 'ioredis';
import { Logger } from '@nestjs/common';
import { PrismaModule } from '../config/prisma/prisma.module';
import { RabbitMQModule } from '../config/rabbitmq/rabbitmq.module';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { SessionSerializer } from './services/session.serializer';
import { EmailConfirmationController } from './controllers/email-confirmation.controller';
import { EmailConfirmationService } from './services/email-confirmation.service';
import { TokenService } from './services/token.service';
import { ScheduleModule } from '@nestjs/schedule';
import { UserController } from './controllers/user.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    RabbitMQModule,
    PassportModule.register({ session: true }),
    ScheduleModule.forRoot(),
  ],
  controllers: [AuthController, EmailConfirmationController, UserController],
  providers: [
    AuthService,
    LocalStrategy,
    SessionSerializer,
    EmailConfirmationService,
    TokenService,
  ],
})
export class AuthModule implements NestModule {
  constructor(private readonly configService: ConfigService) {}

  configure(consumer: MiddlewareConsumer) {
    const redisUrl = this.configService.get<string>('REDIS_URI');
    const sessionSecret = this.configService.get<string>('SESSION_SECRET');
    const sessionMaxAge = Number(
      this.configService.get<number>('SESSION_MAX_AGE'),
    );
    const sessionSecure =
      this.configService.get<string>('SESSION_SECURE') === 'true';
    const sessionPrefix = this.configService.get<string>('SESSION_PREFIX');
    const sessionName = this.configService.get<string>('SESSION_NAME');
    const sessionHTTP_ONLY =
      this.configService.get<string>('SESSION_HTTP_ONLY') === 'true';

    const redisClient = new IORedis(redisUrl);
    redisClient.on('connect', () => {
      Logger.log('🔌 Подключение к Redis установлено');
    });
    redisClient.on('error', (err) => {
      Logger.error('❌ Ошибка подключения к Redis:', err);
    });

    consumer
      .apply(
        cookieParser(),
        session({
          secret: sessionSecret,
          name: sessionName,
          resave: false,
          saveUninitialized: false,
          cookie: {
            secure: sessionSecure,
            httpOnly: sessionHTTP_ONLY,
            maxAge: sessionMaxAge,
            sameSite: 'lax',
            domain: 'localhost',
          },
          store: new RedisStore({
            client: redisClient,
            prefix: sessionPrefix,
            ttl: sessionMaxAge,
            disableTouch: false,
          }),
        }),
        passport.initialize(),
        passport.session(),
      )
      .forRoutes('*');
  }
}
