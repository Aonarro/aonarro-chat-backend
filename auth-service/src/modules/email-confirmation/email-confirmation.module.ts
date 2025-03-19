import { Module } from '@nestjs/common';
import { EmailConfirmationController } from './email-confirmation.controller';
import { EmailConfirmationService } from './email-confirmation.service';
import { PrismaModule } from '../../config/prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [EmailConfirmationController],
  providers: [EmailConfirmationService],
})
export class EmailConfirmationModule {}
