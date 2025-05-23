import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { Chat } from 'prisma/__generated__';
import { firstValueFrom, timeout } from 'rxjs';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { PresenceService } from './presence.service';
import { UserStatusEnum } from 'src/utils/types/types';

export interface ChatWithLastMessageAndUser {
  id: string;
  isGroup: boolean;
  lastMessage: {
    id: string;
    content: string;
  };
  participant: {
    id: string;
    username: string;
    avatarUrl: string;
    status: 'online' | 'offline';
  };
}

@Injectable()
export class ChatService {
  private readonly logger = new Logger(ChatService.name);

  constructor(
    private readonly prismaService: PrismaService,
    @Inject('MESSAGE_SERVICE') private readonly messageClient: ClientProxy,
    @Inject('USER_SERVICE') private readonly userClient: ClientProxy,
    private readonly presenceService: PresenceService,
  ) {}

  async findExistingChat(
    currentUserId: string,
    friendUserId: string,
  ): Promise<Chat | null> {
    return this.prismaService.chat.findFirst({
      where: {
        participants: {
          every: {
            userId: { in: [currentUserId, friendUserId] },
          },
        },
      },
      include: {
        participants: {
          where: {
            userId: {
              not: currentUserId,
            },
          },
        },
      },
    });
  }

  async createNewChat(userId1: string, userId2: string): Promise<Chat> {
    return this.prismaService.chat.create({
      data: {
        participants: {
          create: [{ userId: userId1 }, { userId: userId2 }],
        },
      },
      include: { participants: true },
    });
  }

  async getAllChatsForUser(
    userId: string,
  ): Promise<ChatWithLastMessageAndUser[]> {
    const chats = await this.prismaService.chat.findMany({
      where: {
        participants: { some: { userId } },
      },
      orderBy: { updatedAt: 'desc' },
      select: {
        id: true,
        isGroup: true,
        lastMessageId: true,
        participants: {
          where: { userId: { not: userId } },
          select: { userId: true },
        },
      },
    });

    if (!chats.length) return [];

    const otherUserIds = chats.flatMap((chat) =>
      chat.participants.map((p) => p.userId),
    );
    const messageIds = chats
      .map((chat) => chat.lastMessageId)
      .filter((id): id is string => !!id);

    const [statuses, usersRaw, messagesRaw] = await Promise.all([
      otherUserIds.length
        ? this.presenceService.getUsersStatuses(otherUserIds)
        : new Map<string, 'online' | 'offline' | null>(),
      otherUserIds.length
        ? firstValueFrom(
            this.userClient
              .send('get_users_by_ids', { userIds: otherUserIds })
              .pipe(timeout(5000)),
          ).catch(() => [])
        : [],
      messageIds.length
        ? firstValueFrom(
            this.messageClient
              .send('get_messages_by_ids', { messageIds })
              .pipe(timeout(5000)),
          ).catch(() => [])
        : [],
    ]);

    const users = Array.isArray(usersRaw) ? usersRaw : [];
    const messages = Array.isArray(messagesRaw) ? messagesRaw : [];

    const usersMap = new Map(users.map((user) => [user.userId, user]));
    const messagesMap = new Map(messages.map((msg) => [msg.id, msg]));

    return chats.map((chat) => {
      const participantUserId = chat.participants[0]?.userId;
      const participantUser = participantUserId
        ? usersMap.get(participantUserId)
        : null;
      const lastMessage = chat.lastMessageId
        ? messagesMap.get(chat.lastMessageId)
        : null;

      return {
        id: chat.id,
        isGroup: chat.isGroup,
        lastMessage: lastMessage
          ? {
              id: lastMessage.id,
              content: lastMessage.content,
              senderId: lastMessage.senderId,
              createdAt: lastMessage.createdAt,
            }
          : null,
        participant: participantUser
          ? {
              id: participantUser.id,
              username: participantUser.username,
              avatarUrl: participantUser.avatarUrl,
              status:
                statuses.get(participantUser.userId) === 'online'
                  ? UserStatusEnum.ONLINE
                  : UserStatusEnum.OFFLINE,
              userId: participantUser.userId,
            }
          : null,
      };
    });
  }

  async verifyChatAccess(chatId: string, userId: string): Promise<boolean> {
    try {
      const participant = await this.prismaService.participant.findUnique({
        where: {
          chatId_userId: {
            chatId,
            userId,
          },
        },
      });

      if (!participant) {
        this.logger.warn(
          `Access Denied: User ${userId} is not a chat member ${chatId}`,
        );
        return false;
      }

      return true;
    } catch (error) {
      this.logger.error(
        `Error checking access to chat ${chatId} for the user ${userId}: ${error.message}`,
      );
      throw new RpcException('Error checking access to chat');
    }
  }

  async changeChatLastMessage(
    chatId: string,
    messageId: string,
  ): Promise<void> {
    try {
      await this.prismaService.chat.update({
        where: {
          id: chatId,
        },
        data: {
          lastMessageId: messageId,
        },
      });
    } catch (error) {
      this.logger.error(
        `Error updating last chat message ${chatId}: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }
}
