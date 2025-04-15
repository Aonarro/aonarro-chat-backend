import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../config/prisma/prisma.service';
import { TokenType } from '../../../prisma/__generated__';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class TokenService {
  constructor(private readonly prisma: PrismaService) {}

  private generateNumericCode(length: number): string {
    return Math.floor(Math.random() * 10 ** length)
      .toString()
      .padStart(length, '0');
  }

  async generateToken(
    email: string,
    type: TokenType,
    expiresInMinutes: number,
    length: number = 6,
  ) {
    const token = this.generateNumericCode(length);
    const expiresIn = new Date(Date.now() + expiresInMinutes * 60 * 1000);

    await this.prisma.token.create({
      data: { email, token, type, expiresIn },
    });

    return token;
  }

  async verifyToken(email: string, token: string, type: TokenType) {
    const tokenRecord = await this.prisma.token.findFirst({
      where: {
        email,
        token,
        type,
        expiresIn: { gte: new Date() },
      },
    });

    if (!tokenRecord) {
      throw new BadRequestException('Invalid or expired token');
    }

    await this.prisma.token.delete({ where: { id: tokenRecord.id } });

    return true;
  }

  async findTokenByEmail(email: string) {
    const existingToken = this.prisma.token.findFirst({
      where: {
        email,
        expiresIn: { gte: new Date() },
      },
    });

    return existingToken;
  }

  @Cron(CronExpression.EVERY_5_MINUTES)
  async removeExpiredTokens() {
    await this.prisma.token.deleteMany({
      where: {
        expiresIn: { lte: new Date() },
      },
    });
    console.log('🗑️ Удалены просроченные токены');
  }
}
