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
        this.logger.warn('Получен запрос с отсутствующими параметрами');
        throw new RpcException('Отсутствуют необходимые параметры');
      }

      const hasAccess = await this.chatService.verifyChatAccess(
        chatId,
        senderId,
      );

      this.logger.debug(
        `Проверка доступа завершена - User ID: ${senderId}, Chat ID: ${chatId}, Result: ${hasAccess}`,
      );

      return hasAccess;
    } catch (error) {
      this.logger.error(
        `Ошибка при проверке доступа к чату: ${error.message}`,
        error.stack,
      );
      throw new RpcException(
        error instanceof RpcException
          ? error.message
          : 'Ошибка при проверке доступа к чату',
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
      this.logger.debug(
        `Обновление последнего сообщения для чата ${data.chatId}`,
      );

      await this.chatService.changeChatLastMessage(data.chatId, data.messageId);

      this.logger.debug(
        `Последнее сообщение успешно обновлено для чата ${data.chatId}`,
      );
    } catch (error) {
      this.logger.error(
        `Ошибка при обновлении последнего сообщения чата ${data.chatId}: ${error.message}`,
        error.stack,
      );
    }
  }
}
