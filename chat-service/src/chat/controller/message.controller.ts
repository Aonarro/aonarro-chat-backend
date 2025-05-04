import { Controller, Logger } from '@nestjs/common';
import { ChatService } from '../service/chat.service';
import {
  EventPattern,
  MessagePattern,
  Payload,
  RpcException,
} from '@nestjs/microservices';

@Controller()
export class MessageController {
  private readonly logger = new Logger(MessageController.name);

  constructor(private readonly chatService: ChatService) {}

  @MessagePattern('verify_chat_access')
  async verifyChatAccess(
    @Payload() data: { chatId: string; senderId: string },
  ) {
    console.log('DATA12321312', data);

    try {
      const { chatId, senderId } = data;

      if (!chatId || !senderId) {
        this.logger.warn('Received a request with missing parameters');
        throw new RpcException('Received a request with missing parameters');
      }

      const hasAccess = await this.chatService.verifyChatAccess(
        chatId,
        senderId,
      );

      this.logger.debug(
        `Access check completed - User ID: ${senderId}, Chat ID: ${chatId}, Result: ${hasAccess}`,
      );

      return hasAccess;
    } catch (error) {
      this.logger.error(
        `Error checking access to chat: ${error.message}`,
        error.stack,
      );
      throw new RpcException(
        error instanceof RpcException
          ? error.message
          : 'Error checking access to chat',
      );
    }
  }

  @EventPattern('change_chat_last_message')
  async changeChatLastMessage(
    @Payload()
    data: {
      messageId: string;
      chatId: string;
    },
  ) {
    try {
      this.logger.debug(`Update last message for chat ${data.chatId}`);

      await this.chatService.changeChatLastMessage(data.chatId, data.messageId);

      this.logger.debug(
        `Last message successfully updated for chat ${data.chatId}`,
      );
    } catch (error) {
      this.logger.error(
        `Error updating last chat message ${data.chatId}: ${error.message}`,
        error.stack,
      );
    }
  }
}
