import { Controller } from '@nestjs/common';
import { MessageService } from '../service/message.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  // @MessagePattern('get_message_by_id')
  // async getMessageById(@Payload() data: { messageId: string }) {
  //   const { messageId } = data;
  //   const message = await this.messageService.getMessageById(messageId);
  //   return {
  //     id: message.id,
  //     content: message.content,
  //     createdAt: message.createdAt,
  //   };
  // }

  @MessagePattern('get_messages_by_ids')
  async getMessagesByIds(@Payload() data: { messageIds: string[] }) {
    const { messageIds } = data;
    return await this.messageService.getMessagesByIds(messageIds);
  }
}
