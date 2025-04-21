import { Injectable, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Chat } from 'prisma/__generated__';
import { PrismaService } from 'src/config/prisma/prisma.service';

@Injectable()
export class ChatService {
  private readonly logger = new Logger(ChatService.name);

  constructor(private readonly prismaService: PrismaService) {}

  async findExistingChat(
    userId1: string,
    userId2: string,
  ): Promise<Chat | null> {
    try {
      return await this.prismaService.chat.findFirst({
        where: {
          participants: {
            every: {
              userId: { in: [userId1, userId2] },
            },
          },
        },
        include: { participants: true },
      });
    } catch (error) {
      this.logger.error(`Failed to find existing chat`, error.stack);
      throw new RpcException({
        message: error.message,
        code: error.code || 'EXISTING_CHAT_ERROR',
      });
    }
  }

  async createNewChat(userId1: string, userId2: string): Promise<Chat> {
    try {
      return await this.prismaService.chat.create({
        data: {
          participants: {
            create: [{ userId: userId1 }, { userId: userId2 }],
          },
        },
        include: { participants: true },
      });
    } catch (error) {
      this.logger.error(`Failed to create new chat`, error.stack);
      throw new RpcException({
        message: error.message,
        code: error.code || 'CREATE_CHAT_ERROR',
      });
    }
  }
}
