import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateMessageDto } from 'src/utils/types/types';

@Controller()
export class MessageController {
  constructor() {}

  @MessagePattern('create_message')
  async createMessage(@Payload() data: CreateMessageDto) {}
}
