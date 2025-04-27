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

      const formattedMessage = {
        ...message,
        sender: {
          username: friendProfile.username,
          userId: friendProfile.userId,
        },
      };

      return formattedMessage;
    } catch (error) {
      this.logger.error(`Ошибка при обработке сообщения: ${error.message}`);
      throw new RpcException(error.message || 'Ошибка при создании сообщения');
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

      console.log('MESSAGES DATA31231', messagesData);

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
}
