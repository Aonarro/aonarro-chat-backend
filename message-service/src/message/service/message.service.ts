import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { firstValueFrom, timeout } from 'rxjs';
import { MessageWithSender, UserProfile } from '../../utils/types/types';
import { UserService } from './user.service';
import { FileService } from './file.service';

@Injectable()
export class MessageService {
  private readonly logger = new Logger(MessageService.name);

  constructor(
    private readonly prismaService: PrismaService,
    @Inject('USER_SERVICE')
    private readonly userClient: ClientProxy,
    private readonly fileService: FileService,
    private readonly userService: UserService,
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
          readBy: {
            set: [createMessageData.senderId],
          },
        },
        select: {
          id: true,
          content: true,
          senderId: true,
          createdAt: true,
          readBy: true,
          edited: true,
          deletedForEveryone: true,
          chatId: true,
        },
      });
    } catch (error) {
      this.logger.error(`Error while creating message: ${error.message}`);
      throw new RpcException('Error while creating message');
    }
  }

  async createMessageWithFile(createMessageData: {
    content: string;
    chatId: string;
    senderId: string;
    fileKey: string;
    fileWidth: number;
    fileHeight: number;
  }) {
    try {
      return await this.prismaService.message.create({
        data: {
          content: createMessageData.content,
          chatId: createMessageData.chatId,
          senderId: createMessageData.senderId,
          readBy: {
            set: [createMessageData.senderId],
          },
          attachments: {
            create: [
              {
                fileKey: createMessageData.fileKey,
                width: createMessageData.fileWidth,
                height: createMessageData.fileHeight,
              },
            ],
          },
        },
        select: {
          id: true,
          content: true,
          senderId: true,
          createdAt: true,
          readBy: true,
          edited: true,
          deletedForEveryone: true,
          chatId: true,
          attachments: {
            select: {
              fileKey: true,
              width: true,
              height: true,
            },
          },
        },
      });
    } catch (error) {
      this.logger.error(`Error while creating message: ${error.message}`);
      throw new RpcException('Error while creating message');
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
          attachments: true,
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

      const fileKeys = messages.flatMap(
        (message) => message.attachments?.map((att) => att.fileKey) || [],
      );

      let fileUrls: { [key: string]: string } = {};

      if (fileKeys.length > 0) {
        const fileUrlsResponse = await this.fileService.getFileUrls(fileKeys);
        console.log('File URLs Response:', fileUrlsResponse);

        fileUrls = fileKeys.reduce((acc, key, index) => {
          acc[key] = fileUrlsResponse[index];
          return acc;
        }, {});
      }

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
          attachments: message.attachments?.map((attachment) => ({
            fileKey: attachment.fileKey,
            url: fileUrls[attachment.fileKey],
            width: attachment.width,
            height: attachment.height,
          })),
        }),
      );

      return {
        messages: formattedMessages,
        total,
        hasMore: offset + messages.length < total,
      };
    } catch (error) {
      this.logger.error(`Error receiving chat messages: ${error.message}`);
      throw new RpcException('Error receiving chat messages');
    }
  }

  async markMessagesAsRead(
    messageIds: string[],
    userId: string,
    chatId: string,
  ) {
    console.log('Starting markMessagesAsRead with:', {
      messageIds,
      userId,
      chatId,
    });

    try {
      const messages = await this.prismaService.message.findMany({
        where: {
          id: { in: messageIds },
          chatId: chatId,
        },
        select: {
          id: true,
          readBy: true,
          chatId: true,
        },
      });

      console.log('Found messages:', messages);

      if (!messages.length) {
        return [];
      }

      const updatePromises = messages.map((message) => {
        const uniqueReadBy = new Set([...(message.readBy || []), userId]);
        const readByArray = Array.from(uniqueReadBy);

        return this.prismaService.message.update({
          where: {
            id: message.id,
            chatId: chatId,
          },
          data: {
            readBy: {
              set: readByArray,
            },
          },
          select: {
            id: true,
            readBy: true,
            chatId: true,
          },
        });
      });

      const updatedMessages = await Promise.all(updatePromises);

      return updatedMessages;
    } catch (error) {
      this.logger.error(`Error marking messages as read: ${error.message}`);
      throw new RpcException('Failed to mark messages as read');
    }
  }

  async updateMessage(
    chatId: string,
    messageId: string,
    userId: string,
    content: string,
  ) {
    try {
      const existingMessage = await this.prismaService.message.findUnique({
        where: {
          id: messageId,
          chatId: chatId,
          senderId: userId,
        },
      });

      if (!existingMessage) {
        this.logger.warn(
          `Message with ID ${messageId} not found for user ${userId} in chat ${chatId}`,
        );
        throw new RpcException('Message not found');
      }

      const lastMessage = await this.getLastMessageFromChat(chatId);
      const senderProfile = await this.userService.getUserProfileById(userId);
      const isMessageLast = lastMessage?.id === messageId;

      const response = await this.prismaService.message.update({
        where: {
          chatId: chatId,
          id: messageId,
          senderId: userId,
        },
        data: {
          content: content,
          edited: true,
        },
        select: {
          id: true,
          content: true,
          senderId: true,
          createdAt: true,
          readBy: true,
          edited: true,
          deletedForEveryone: true,
          chatId: true,
        },
      });

      const { senderId, ...restProperties } = response;

      const formattedMessage = {
        ...restProperties,
        sender: {
          userId: senderProfile.userId,
          username: senderProfile.username,
        },
      };

      return {
        updatedMessage: formattedMessage,
        chatId,
        isMessageLast,
      };
    } catch (error) {
      this.logger.error(`Error while updating message: ${error.message}`);
      throw new RpcException('Error while updating message');
    }
  }

  async deleteMessage(chatId: string, messageId: string, userId: string) {
    try {
      const existingMessage = await this.prismaService.message.findUnique({
        where: {
          id: messageId,
          chatId,
          senderId: userId,
        },
      });

      if (!existingMessage) {
        this.logger.warn(
          `Message with ID ${messageId} not found for user ${userId} in chat ${chatId}`,
        );
        throw new RpcException('Message not found');
      }

      const lastMessageBeforeDelete = await this.getLastMessageFromChat(chatId);
      const isMessageLast = lastMessageBeforeDelete?.id === messageId;

      const deletedMessage = await this.prismaService.message.delete({
        where: {
          id: messageId,
        },
        select: {
          id: true,
          senderId: true,
          createdAt: true,
          chatId: true,
        },
      });

      const newLastMessage = isMessageLast
        ? await this.getLastMessageFromChat(chatId)
        : null;

      const { senderId, ...restProperties } = newLastMessage || {};

      const formattedMessage = {
        ...restProperties,
        sender: {
          userId: senderId,
        },
      };

      return {
        deletedMessageId: deletedMessage.id,
        chatId: deletedMessage.chatId,
        isMessageLast,
        lastMessage: isMessageLast ? formattedMessage : null,
      };
    } catch (error) {
      this.logger.error(`Error while deleting message: ${error.message}`);
      throw new RpcException('Error while deleting message');
    }
  }

  async getLastMessageFromChat(chatId: string) {
    return await this.prismaService.message.findFirst({
      where: {
        chatId: chatId,
        deletedForEveryone: false,
      },
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        content: true,
        chatId: true,
        createdAt: true,
        edited: true,
        readBy: true,
        senderId: true,
      },
    });
  }

  async getUnreadMessagesCount(
    chatId: string,
    userId: string,
  ): Promise<number> {
    try {
      const unreadMessagesCount = await this.prismaService.message.count({
        where: {
          chatId: chatId,
          NOT: {
            readBy: {
              has: userId,
            },
          },
        },
      });

      return unreadMessagesCount;
    } catch (error) {
      this.logger.error(
        `Error while getting unread messages count: ${error.message}`,
      );
      throw new RpcException('Error while getting unread messages count');
    }
  }
}
