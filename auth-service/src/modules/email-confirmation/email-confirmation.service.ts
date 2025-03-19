import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../config/prisma/prisma.service';
import { ConfirmationDto } from './dto/confirmation.dto';
import { TokenType } from '../../../prisma/__generated__';
import { AuthService } from '../auth/auth.service';
import { Request } from 'express';

@Injectable()
export class EmailConfirmationService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly authService: AuthService,
  ) {}

  public async newVerification(req: Request, confirmationDto: ConfirmationDto) {
    const existingToken = await this.prismaService.token.findUnique({
      where: {
        token: confirmationDto.token,
        type: TokenType.VERIFICATION,
      },
    });

    if (!existingToken) {
      throw new NotFoundException('Verification token not found');
    }

    const isExpired = new Date(existingToken.expiresIn) < new Date();

    if (isExpired) {
      throw new BadRequestException('Verification token is expired');
    }

    const existingUser = await this.authService.getUserDataByEmail(
      existingToken.email,
    );

    if (!existingUser) {
      throw new NotFoundException('User with this email is not found');
    }

    await this.prismaService.user.update({
      where: {
        id: existingUser.id,
      },
      data: {
        isVerified: true,
      },
    });

    await this.prismaService.token.delete({
      where: {
        id: existingToken.id,
        type: TokenType.VERIFICATION,
      },
    });

    return await this.authService.authenticateAndSaveSession(
      req,
      existingUser,
      'Email verified and user logged in',
    );
  }
}
