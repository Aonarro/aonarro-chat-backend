import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { catchError, firstValueFrom, timeout } from 'rxjs';

@Injectable()
export class ChatService {
  private readonly logger = new Logger(ChatService.name);

  constructor(
    private readonly prismaService: PrismaService,
    @Inject('CHAT_SERVICE')
    private readonly chatClient: ClientProxy,
  ) {}

  async verifyChatAccess(chatId: string, senderId: string) {
    console.log('verify', chatId, senderId);

    try {
      const hasAccess = await firstValueFrom(
        this.chatClient.send('verify_chat_access', { chatId, senderId }).pipe(
          timeout(10000),
          catchError((_error) => {
            throw new RpcException('Failed to verify chat access');
          }),
        ),
      );

      console.log('has access', hasAccess);

      if (!hasAccess) {
        throw new RpcException('Access denied or chat does not exist');
      }
    } catch (error) {
      this.logger.error(
        `Failed to verify chat access for user "${senderId}" and chat "${chatId}": ${error.message}`,
      );
      throw error;
    }
  }

  async changeChatLastMessage(
    messageId: string,
    chatId: string,
  ): Promise<void> {
    try {
      await firstValueFrom(
        this.chatClient
          .emit('change_chat_last_message', { messageId, chatId })
          .pipe(
            timeout(5000),
            catchError((error) => {
              this.logger.error('Error sending new message notification');
              return [];
            }),
          ),
      );
    } catch (error) {
      this.logger.error(
        `Error sending new message notification: ${error.message}`,
      );
    }
  }
}
