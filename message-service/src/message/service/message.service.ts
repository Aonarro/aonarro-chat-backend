import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { firstValueFrom, timeout } from 'rxjs';
import { MessageWithSender, UserProfile } from '../../utils/types/types';

@Injectable()
export class MessageService {
  private readonly logger = new Logger(MessageService.name);

  constructor(
    private readonly prismaService: PrismaService,
    @Inject('USER_SERVICE')
    private readonly userClient: ClientProxy,
  ) {}

  async getMessagesByIds(messageIds: string[]) {
    return this.prismaService.message.findMany({
      where: {
        id: { in: messageIds },
      },
      select: {
        id: true,
        content: true,
        senderId: true,
        createdAt: true,
      },
    });
  }

  async createMessage(createMessageData: {
    content: string;
    chatId: string;
    senderId: string;
  }) {
    try {
      return await this.prismaService.message.create({
        data: {
          content: createMessageData.content,
          chatId: createMessageData.chatId,
          senderId: createMessageData.senderId,
        },
        select: {
          id: true,
          content: true,
          senderId: true,
          createdAt: true,
          readBy: true,
          edited: true,
          deletedForEveryone: true,
        },
      });
    } catch (error) {
      this.logger.error(`Ошибка при создании сообщения: ${error.message}`);
      throw new RpcException('Ошибка при создании сообщения');
    }
  }

  async getMessagesByChatId(chatId: string, limit = 50, offset = 0) {
    try {
      const messages = await this.prismaService.message.findMany({
        where: {
          chatId: chatId,
        },
        select: {
          id: true,
          content: true,
          createdAt: true,
          edited: true,
          senderId: true,
          readBy: true,
          deletedForEveryone: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
        skip: offset,
        take: limit,
      });

      if (!messages.length) {
        return {
          messages: [],
          total: 0,
          hasMore: false,
        };
      }

      this.logger.debug(`Found ${messages.length} messages for chat ${chatId}`);

      const total = await this.prismaService.message.count({
        where: {
          chatId: chatId,
        },
      });

      const senderIds = [
        ...new Set(messages.map((message) => message.senderId)),
      ];

      const senderProfiles = await firstValueFrom<UserProfile[]>(
        this.userClient
          .send('get_message_sender_profile_by_ids', {
            userIds: senderIds,
          })
          .pipe(timeout(10000)),
      );

      const profilesMap = new Map(
        senderProfiles.map((profile) => [profile.userId, profile]),
      );

      const formattedMessages: MessageWithSender[] = messages.map(
        (message) => ({
          id: message.id,
          content: message.content,
          createdAt: message.createdAt,
          edited: message.edited,
          readBy: message.readBy,
          deletedForEveryone: message.deletedForEveryone,
          sender: {
            userId: message.senderId,
            username:
              profilesMap.get(message.senderId)?.username || 'Unknown User',
          },
        }),
      );

      return {
        messages: formattedMessages,
        total,
        hasMore: offset + messages.length < total,
      };
    } catch (error) {
      this.logger.error(
        `Ошибка при получении сообщений чата: ${error.message}`,
      );
      throw new RpcException('Ошибка при получении сообщений');
    }
  }
}
