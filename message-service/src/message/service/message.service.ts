import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { CreateMessageDto } from 'src/utils/types/types';

@Injectable()
export class MessageService {
  private readonly logger = new Logger(MessageService.name);

  constructor(private readonly prismaService: PrismaService) {}

  async createMessage(data: CreateMessageDto) {}
}
