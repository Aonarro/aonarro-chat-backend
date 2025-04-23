import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PrismaService } from 'src/config/prisma/prisma.service';

@Injectable()
export class MessageService {
  private readonly logger = new Logger(MessageService.name);

  constructor(
    private readonly prismaService: PrismaService,
    @Inject('CHAT_SERVICE')
    private readonly chatClient: ClientProxy,
  ) {}

  async getMessagesByIds(messageIds: string[]) {
    return await this.prismaService.message.findMany({
      where: {
        id: { in: messageIds },
      },
      select: {
        id: true,
        content: true,
      },
    });
  }
}
