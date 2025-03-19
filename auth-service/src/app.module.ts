import IORedis from 'ioredis';
import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { PrismaModule } from './config/prisma/prisma.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { EmailConfirmationModule } from './modules/email-confirmation/email-confirmation.module';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import * as passport from 'passport';
import { RedisStore } from 'connect-redis';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ClientsModule.register([
      {
        name: 'NOTIFICATION_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'notifications_queue',
        },
      },
    ]),
    PrismaModule,
    AuthModule,
    EmailConfirmationModule,
    PassportModule.register({ session: true }),
  ],
})
export class AppModule implements NestModule {
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

    console.log(
      'Redis URL:',
      redisUrl,
      'Session Secret:',
      sessionSecret,
      ' Session Max Age:',
      sessionMaxAge,
      'Session Secure:',
      sessionSecure,
      'Session Prefix:',
      sessionPrefix,
      'Session Name:',
      sessionName,
      'Session HTTP Only:',
      sessionHTTP_ONLY,
    );

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
