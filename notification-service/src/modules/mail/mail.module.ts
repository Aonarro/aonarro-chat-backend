import { Module } from '@nestjs/common';
import { MailController } from './mail.controller';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        transport: {
          host: configService.getOrThrow<string>('MAIL_HOST'),
          port: configService.getOrThrow<number>('MAIL_PORT'),
          secure: false,
          auth: {
            user: configService.getOrThrow<string>('MAIL_LOGIN'),
            pass: configService.getOrThrow<string>('MAIL_PASSWORD'),
          },
        },
        defaults: {
          from: `"Nestjs-auth" ${configService.getOrThrow<string>('MAIL_LOGIN')}`,
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [MailController],
  providers: [MailService],
})
export class MailModule {}
