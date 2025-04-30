import { Controller, Logger } from '@nestjs/common';
import { MessageService } from '../service/message.service';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { ChatService } from '../service/chat.service';
import { UserService } from '../service/user.service';
import { MessagesResponse } from '../../utils/types/types';

@Controller()
export class MessageController {
  private readonly logger = new Logger(MessageController.name);

  constructor(
    private readonly messageService: MessageService,
    private readonly chatService: ChatService,
    private readonly userService: UserService,
  ) {}

  @MessagePattern('get_messages_by_ids')
  async getMessagesByIds(@Payload() data: { messageIds: string[] }) {
    const { messageIds } = data;
    return this.messageService.getMessagesByIds(messageIds);
  }

  @MessagePattern('create_message')
  async createMessage(
    @Payload() data: { content: string; chatId: string; senderId: string },
  ) {
    console.log('create_message', data);

    try {
      await this.chatService.verifyChatAccess(data.chatId, data.senderId);

      const message = await this.messageService.createMessage(data);

      await this.chatService.changeChatLastMessage(message.id, data.chatId);

      const friendProfile = await this.userService.getUserProfileById(
        message.senderId,
      );

      const { senderId, ...otherFields } = message;

      const formattedMessage = {
        ...otherFields,
        sender: {
          username: friendProfile.username,
          userId: friendProfile.userId,
        },
      };

      return formattedMessage;
    } catch (error) {
      this.logger.error(`creating message error: ${error.message}`);
      if (error instanceof RpcException) {
        throw error;
      }

      throw new RpcException({
        message: 'create message error',
        code: 'CREATE_MESSAGE_ERROR',
      });
    }
  }

  @MessagePattern('get_chat_messages')
  async getAllMessages(
    @Payload()
    data: {
      chatId: string;
      userId: string;
      limit?: number;
      offset?: number;
    },
  ): Promise<MessagesResponse> {
    try {
      console.log('get_chat_messages', data.chatId, data.userId);

      await this.chatService.verifyChatAccess(data.chatId, data.userId);

      const messagesData = await this.messageService.getMessagesByChatId(
        data.chatId,
        data.limit,
        data.offset,
      );

      return {
        messages: messagesData.messages,
        total: messagesData.total,
        hasMore: messagesData.hasMore,
      };
    } catch (error) {
      this.logger.error(
        `Ошибка при получении сообщений чата ${data.chatId}: ${error.message}`,
        error.stack,
      );

      if (error instanceof RpcException) {
        throw error;
      }

      throw new RpcException({
        message: 'Ошибка при получении сообщений',
        code: 'MESSAGES_FETCH_ERROR',
      });
    }
  }

  @MessagePattern('mark_messages_as_read')
  async markMessagesAsRead(
    @Payload() data: { messageIds: string[]; userId: string; chatId: string },
  ) {
    try {
      return this.messageService.markMessagesAsRead(
        data.messageIds,
        data.userId,
        data.chatId,
      );
    } catch (error) {
      if (error instanceof RpcException) {
        throw error;
      }

      throw new RpcException({
        message: 'mark messages updated error',
        code: 'MARK_MESSAGES_UPDATED_ERROR',
      });
    }
  }

  @MessagePattern('edit_message')
  async editMessage(
    @Payload()
    data: {
      messageId: string;
      userId: string;
      chatId: string;
      content: string;
    },
  ) {
    try {
      const result = await this.messageService.updateMessage(
        data.chatId,
        data.messageId,
        data.userId,
        data.content,
      );

      return result;
    } catch (error) {
      if (error instanceof RpcException) {
        throw error;
      }

      throw new RpcException({
        message: 'editing message error',
        code: 'EDITING_MESSAGE_ERROR',
      });
    }
  }

  @MessagePattern('delete_message')
  async deleteMessage(
    @Payload()
    data: {
      messageId: string;
      userId: string;
      chatId: string;
    },
  ) {
    try {
      const result = await this.messageService.deleteMessage(
        data.chatId,
        data.messageId,
        data.userId,
      );

      if (result.isMessageLast) {
        await this.chatService.changeChatLastMessage(
          result.lastMessage.id,
          data.chatId,
        );
      }

      return result;
    } catch (error) {
      if (error instanceof RpcException) {
        throw error;
      }

      throw new RpcException({
        message: 'deleting message error',
        code: 'DELETING_MESSAGE_ERROR',
      });
    }
  }

  @MessagePattern('get_unread_messages_count')
  async getUnreadMessagesCount(
    @Payload()
    data: {
      userId: string;
      chatId: string;
    },
  ) {
    try {
      const result = await this.messageService.getUnreadMessagesCount(
        data.chatId,
        data.userId,
      );

      return result;
    } catch (error) {
      if (error instanceof RpcException) {
        throw error;
      }

      throw new RpcException({
        message: 'getting unread messages count error',
        code: 'GETTING_UNREAD_MESSAGES_COUNT_ERROR',
      });
    }
  }
}
