import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from '../../config/prisma/prisma.module';
import { TokenModule } from '../token/token.module';
import { RabbitMQModule } from '../rabbitmq/rabbitmq.module';
import { LocalStrategy } from './strategies/local.strategy';
import { SessionSerializer } from './session.serializer';

@Module({
  imports: [PrismaModule, TokenModule, RabbitMQModule],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, SessionSerializer],
  exports: [AuthService, SessionSerializer],
})
export class AuthModule {}
