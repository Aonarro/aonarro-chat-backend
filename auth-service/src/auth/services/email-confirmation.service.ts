import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../config/prisma/prisma.service';
import { ConfirmationDto } from '../dto/confirmation.dto';
import { TokenType } from '../../../prisma/__generated__';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { TokenService } from './token.service';

@Injectable()
export class EmailConfirmationService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly authService: AuthService,
    private readonly tokenService: TokenService,
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

    await this.tokenService.verifyToken(
      existingToken.email,
      confirmationDto.token,
      TokenType.VERIFICATION,
    );

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

    return await this.authService.authenticateAndSaveSession(
      req,
      existingUser,
      'Email verified and user logged in',
    );
  }
}
