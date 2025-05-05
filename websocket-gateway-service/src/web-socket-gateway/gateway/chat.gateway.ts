import {
  Inject,
  Logger,
  UnauthorizedException,
  UseFilters,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  MessageBody,
  WsException,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { AuthService } from '../service/auth.service';
import { SocketWithUserId, UserStatusEnum } from 'src/utils/types/types';
import { parse } from 'cookie';
import { PresenceService } from '../service/presence.service';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, firstValueFrom, timeout } from 'rxjs';
import { WsValidationFilter } from 'src/utils/filters/ws-validation.filter';
import { WsRpcExceptionFilter } from '../../utils/filters/ws-exception.filter';
import { CreateMessageDto } from '../dto/create-message.dto';
import { SendMessageWithFileDto } from '../dto/create-message-with-file.dto';

@WebSocketGateway({
  namespace: '/chat-ws',
  path: '/socket.io',
  withCredentials: true,
  cors: {
    origin: ['http://localhost:3000'],
  },
  transports: ['websocket', 'polling'],
  allowEIO3: true,
  pingInterval: 10000,
  pingTimeout: 5000,
  maxHttpBufferSize: 10e6,
})
@UseFilters(WsValidationFilter, WsRpcExceptionFilter)
@UsePipes(
  new ValidationPipe({
    transform: true,
  }),
)
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(ChatGateway.name);

  constructor(
    private readonly authService: AuthService,
    private readonly presenceService: PresenceService,
    @Inject('USER_SERVICE')
    private readonly userClient: ClientProxy,
    @Inject('CHAT_SERVICE')
    private readonly chatClient: ClientProxy,
    @Inject('MESSAGE_SERVICE')
    private readonly messageClient: ClientProxy,
  ) {}

  async handleConnection(@ConnectedSocket() client: SocketWithUserId) {
    try {
      const cookies = client.handshake.headers.cookie;

      if (!cookies) {
        this.logger.warn('Connection attempt without session cookies');
        throw new UnauthorizedException('Session cookie not found');
      }

      const parsedCookies = parse(cookies);
      const sessionCookie = parsedCookies['session'];

      const sessionId = sessionCookie.startsWith('s:')
        ? sessionCookie.slice(2).split('.')[0]
        : sessionCookie.split('.')[0];

      const userId = await this.authService.validateSession(sessionId);
      client.userId = userId;

      this.logger.log(
        `New connection established - User ID: ${userId}, Socket ID: ${client.id}`,
      );
      client.emit('connection_success', { status: 'connected' });

      await this.presenceService.addUserSocket(userId, client.id);
      this.logger.log(`User status updated to ONLINE - User ID: ${userId}`);

      this.userClient.emit('user_last_login', {
        userId: userId,
        loginTime: new Date().toISOString(),
      });
      this.logger.log(`Last login time recorded - User ID: ${userId}`);
      // this.server.emit('user_status_updated', {
      //   userId: client.userId,
      //   status: UserStatusEnum.ONLINE,
      // });
    } catch (error) {
      this.logger.error(
        `Authentication failed - Socket ID: ${client.id}`,
        error.stack,
      );
      client.disconnect();
    }
  }

  async handleDisconnect(@ConnectedSocket() client: SocketWithUserId) {
    this.logger.log(
      `Client disconnecting - User ID: ${client.userId}, Socket ID: ${client.id}`,
    );

    try {
      await this.presenceService.removeUserSocket(client.userId, client.id);

      const isOnline = await this.presenceService.isUserOnline(client.userId);

      if (!isOnline) {
        this.logger.log(
          `User status updated to OFFLINE - User ID: ${client.userId}`,
        );
        this.server.emit('user_status_updated', {
          userId: client.userId,
          status: UserStatusEnum.OFFLINE,
        });
        this.logger.log(
          `Status update broadcasted for User ID: ${client.userId}`,
        );
      }
    } catch (error) {
      this.logger.error(
        `Failed to handle disconnect properly - User ID: ${client.userId}`,
        error.stack,
      );
    }
  }

  @SubscribeMessage('user_status_change')
  async handleUserStatusChange(
    @ConnectedSocket() client: SocketWithUserId,
    @MessageBody() data: { status: UserStatusEnum },
  ) {
    this.logger.log(
      `Processing status change request - User ID: ${client.userId}, New Status: ${data.status}`,
    );
    try {
      this.logger.log(
        `Status successfully updated - User ID: ${client.userId}, Status: ${data.status}`,
      );

      if (data.status === UserStatusEnum.OFFLINE) {
        await this.presenceService.setUserStatusOffline(
          client.userId,
          UserStatusEnum.OFFLINE,
        );
      } else {
        await this.presenceService.refreshUserTTL(client.userId, client.id);
      }

      this.server.emit('user_status_updated', {
        userId: client.userId,
        status: data.status,
      });
      this.logger.log(
        `Status update notification sent - User ID: ${client.userId}`,
      );
    } catch (error) {
      this.logger.error(
        `Failed to update user status - User ID: ${client.userId}`,
        error.stack,
      );
      throw new WsException('Failed to update user status');
    }
  }

  @SubscribeMessage('create_or_get_chat')
  async createOrGetChat(
    @ConnectedSocket() client: SocketWithUserId,
    @MessageBody() data: { username: string; requestId: string },
  ) {
    if (!data.username || !data.requestId) {
      throw new WsException('Invalid request data');
    }
    this.logger.log(
      `Initiating chat creation/retrieval - Initiator: ${client.userId}, Target User: ${data.username}`,
    );

    try {
      this.logger.debug(
        `Checking chatClient connection status: ${this.chatClient['connected']}`,
      );

      const currentUserId = client.userId;
      this.logger.debug(
        `Sending request to chat service - Initiator: ${currentUserId}, Target: ${data.username}`,
      );

      const chat = await firstValueFrom(
        this.chatClient
          .send('create_or_get_chat', {
            currentUserId,
            username: data.username,
          })
          .pipe(
            timeout(10000),
            catchError((error) => {
              this.logger.error(
                `RabbitMQ communication failure - Initiator: ${currentUserId}`,
                error.stack,
              );
              throw error;
            }),
          ),
      );

      this.logger.log(
        `Chat successfully processed - Chat ID: ${chat.id}, Initiator: ${currentUserId}`,
      );

      client.emit('chat_ready', { chat: chat.chat, requestId: data.requestId });
      console.log('CHAT RESPONSE', chat);
      if (chat.isNewChat) {
        console.log('new chat' + chat.isNewChat);
        this.server.emit('notify_new_chat', {
          receiverId: chat.chat.participantProfile.userId,
        });
      }
    } catch (error) {
      this.logger.error(
        `Chat operation failed - Initiator: ${client.userId}`,
        error.stack,
      );
      if (error instanceof WsException) {
        throw error;
      }
      throw new WsException(error.message || 'Chat operation failed');
    }
  }

  @SubscribeMessage('get_all_chats')
  async getAllChats(@ConnectedSocket() client: SocketWithUserId) {
    this.logger.log(
      `Fetching all chats request received - User ID: ${client.userId}`,
    );

    try {
      const userId = client.userId;
      this.logger.debug(`Querying chats for user - User ID: ${userId}`);

      const chats = await firstValueFrom(
        this.chatClient.send('get_all_chats', { userId }).pipe(
          timeout(10000),
          catchError((error) => {
            this.logger.error(
              `RabbitMQ communication failure - User ID: ${userId}`,
              error.stack,
            );
            throw new WsException('Chat service unavailable');
          }),
        ),
      );

      this.logger.log(
        `Successfully retrieved ${chats.length} chats for User ID: ${userId}`,
      );
      client.emit('chats_list', chats);
    } catch (error) {
      this.logger.error(
        `Failed to fetch chats - User ID: ${client.userId}`,
        error.stack,
      );

      if (error instanceof WsException) {
        throw error;
      }

      throw new WsException('Failed to fetch chats');
    }
  }

  @SubscribeMessage('join_room')
  async handleJoinRoom(
    @ConnectedSocket() client: SocketWithUserId,
    @MessageBody() data: { chatId: string },
  ) {
    const { chatId } = data;

    try {
      if (!chatId) {
        throw new WsException('Chat ID not specified');
      }

      console.log('JOIN ROOM');
      await client.join(chatId);
    } catch (error) {
      this.logger.error(`Error entering chat: ${error.message}`);
      throw new WsException(error.message || 'Error entering chat');
    }
  }

  @SubscribeMessage('load_chat_messages')
  async handleLoadChatMessages(
    @ConnectedSocket() client: SocketWithUserId,
    @MessageBody()
    data: {
      chatId: string;
      limit?: number;
      offset?: number;
      requestMessagesId: string;
    },
  ) {
    const { chatId, limit = 50, offset = 0, requestMessagesId } = data;

    try {
      console.log('fetch message все', data);

      const messagesData = await firstValueFrom(
        this.messageClient
          .send('get_chat_messages', {
            chatId,
            userId: client.userId,
            limit,
            offset,
          })
          .pipe(
            timeout(10000),
            catchError((error) => {
              this.logger.error(
                `RabbitMQ communication failure - User ID: ${client.userId}`,
                error.stack,
              );
              throw new WsException('Chat service unavailable');
            }),
          ),
      );

      this.server.to(chatId).emit('chat_messages_loaded', {
        chatId,
        requestMessagesId: requestMessagesId,
        messages: messagesData.messages,
        total: messagesData.total,
        hasMore: messagesData.hasMore,
      });
    } catch (error) {
      this.logger.error(
        `Error loading chat messages: ${error.message}`,
        error.stack,
      );

      throw new WsException(error.message || 'Error loading chat messages');
    }
  }

  @SubscribeMessage('leave_room')
  handleLeaveRoom(
    @MessageBody() data: { chatId: string },
    @ConnectedSocket() client: SocketWithUserId,
  ) {
    const { chatId } = data;
    this.logger.warn(
      `Leave room request - User ID: ${client.userId}, Chat ID: ${chatId}`,
    );

    client.leave(chatId);
    this.logger.log(
      `User left room - User ID: ${client.userId}, Chat ID: ${chatId}`,
    );
  }

  @SubscribeMessage('send_message')
  async handleSendMessage(
    @ConnectedSocket() client: SocketWithUserId,
    @MessageBody() data: CreateMessageDto,
  ) {
    const { chatId, content } = data;
    this.logger.warn('new message', content);

    try {
      const messagePayload = {
        chatId,
        senderId: client.userId,
        content,
      };

      const createdMessage = await firstValueFrom(
        this.messageClient.send('create_message', messagePayload).pipe(
          timeout(10000),
          catchError((error) => {
            this.logger.error(
              `RabbitMQ error while sending message - User ID: ${client.userId}`,
              error.stack,
            );
            throw error;
          }),
        ),
      );

      this.server.to(chatId).emit('new_message', createdMessage);
      this.server.emit('new_message_notification', createdMessage);

      this.logger.debug(
        `Message sent successfully - Chat ID: ${chatId}, User ID: ${client.userId}`,
      );
    } catch (error) {
      this.logger.error(
        `Failed to send message - User ID: ${client.userId}`,
        error.stack,
      );

      if (error instanceof WsException) {
        throw error;
      }

      throw new WsException(error.message || 'Failed to send message');
    }
  }

  @SubscribeMessage('send_message_with_file')
  async handleSendMessageWithFile(
    @ConnectedSocket() client: SocketWithUserId,
    @MessageBody() data: SendMessageWithFileDto,
  ) {
    const { chatId, content, file } = data;
    this.logger.warn('new message with file', {
      chatId,
      content,
      hasFile: !!file,
      file,
    });

    console.log('new message with file', {
      chatId,
      content,
      hasFile: !!file,
      file,
    });

    try {
      const messagePayload: {
        chatId: string;
        senderId: string;
        content: string;
        file: {
          name: string;
          type: string;
          data: number[];
          width: number;
          height: number;
        };
      } = {
        chatId,
        senderId: client.userId,
        content,
        file: {
          name: file.name,
          type: file.type,
          data: file.data,
          width: file.width,
          height: file.height,
        },
      };

      const createdMessage = await firstValueFrom(
        this.messageClient
          .send('create_message_with_file', messagePayload)
          .pipe(
            timeout(10000),
            catchError((error) => {
              this.logger.error(
                `RabbitMQ error while sending message with file - User ID: ${client.userId}`,
                error.stack,
              );
              throw error;
            }),
          ),
      );

      this.server.to(chatId).emit('new_message', createdMessage);
      this.server.emit('new_message_notification', createdMessage);

      this.logger.debug(
        `Message with file sent successfully - Chat ID: ${chatId}, User ID: ${client.userId}`,
      );
    } catch (error) {
      this.logger.error(
        `Failed to send message with file - User ID: ${client.userId}`,
        error.stack,
      );

      if (error instanceof WsException) {
        throw error;
      }

      throw new WsException(
        error.message || 'Failed to send message with file',
      );
    }
  }

  @SubscribeMessage('mark_messages_read')
  async handleMarkMessagesRead(
    @ConnectedSocket() client: SocketWithUserId,
    @MessageBody() data: { messageIds: string[]; chatId: string },
  ) {
    const { messageIds, chatId } = data;

    try {
      const markedMessages = await firstValueFrom(
        this.messageClient
          .send('mark_messages_as_read', {
            chatId,
            messageIds,
            userId: client.userId,
          })
          .pipe(
            timeout(10000),
            catchError((error) => {
              this.logger.error(
                `Failed to mark messages as read - User ID: ${client.userId}`,
                error.stack,
              );
              throw error;
            }),
          ),
      );

      this.server.to(chatId).emit('messages_marked_read', {
        chatId,
        messages: markedMessages,
        userId: client.userId,
      });
    } catch (error) {
      this.logger.error(
        `Message read status update failed - User ID: ${client.userId}`,
        error.stack,
      );

      if (error instanceof WsException) {
        throw error;
      }

      throw new WsException('Failed to update message read status');
    }
  }

  @SubscribeMessage('edit_message')
  async handleEditMessage(
    @ConnectedSocket() client: SocketWithUserId,
    @MessageBody() data: { messageId: string; chatId: string; content: string },
  ) {
    const { chatId, content, messageId } = data;

    try {
      console.log('update message', data);
      const response = await firstValueFrom(
        this.messageClient
          .send('edit_message', {
            chatId,
            messageId,
            userId: client.userId,
            content,
          })
          .pipe(
            timeout(10000),
            catchError((error) => {
              this.logger.error(
                `Failed to edit message  User ID: ${client.userId}`,
                error.stack,
              );
              throw error;
            }),
          ),
      );

      const { updatedMessage, isMessageLast } = response;

      this.server.to(chatId).emit('edited_message', updatedMessage);
      if (isMessageLast) {
        this.server.emit('new_message_notification', updatedMessage);
      }
    } catch (error) {
      this.logger.error(
        `Message editing failed - User ID: ${client.userId}`,
        error.stack,
      );

      if (error instanceof WsException) {
        throw error;
      }

      throw new WsException('Failed to update message');
    }
  }

  @SubscribeMessage('delete_message')
  async handleDeleteMessage(
    @ConnectedSocket() client: SocketWithUserId,
    @MessageBody() data: { messageId: string; chatId: string },
  ) {
    const { chatId, messageId } = data;

    try {
      const response = await firstValueFrom(
        this.messageClient
          .send('delete_message', {
            chatId: chatId,
            messageId,
            userId: client.userId,
          })
          .pipe(
            timeout(10000),
            catchError((error) => {
              this.logger.error(
                `Failed to delete message - User ID: ${client.userId}`,
                error.stack,
              );
              throw error;
            }),
          ),
      );

      const {
        deletedMessageId,
        isMessageLast,
        lastMessage,
        chatId: currentChatId,
      } = response;

      this.server.to(chatId).emit('deleted_message', {
        messageId: deletedMessageId,
        chatId: currentChatId,
      });

      console.log(lastMessage, 'lastMessage');

      if (isMessageLast) {
        this.server.emit('new_message_notification', lastMessage);
      }
    } catch (error) {
      this.logger.error(
        `Message deletion failed - User ID: ${client.userId}`,
        error.stack,
      );

      if (error instanceof WsException) {
        throw error;
      }

      throw new WsException('Failed to delete message');
    }
  }

  @SubscribeMessage('get_unread_messages_count')
  async handleGetUnreadMessagesCount(
    @ConnectedSocket() client: SocketWithUserId,
    @MessageBody() data: { chatId: string },
  ) {
    const { chatId } = data;
    try {
      console.log('start get unread messages count', data);
      const unreadMessagesCount = await firstValueFrom(
        this.messageClient
          .send('get_unread_messages_count', {
            userId: client.userId,
            chatId,
          })
          .pipe(
            timeout(10000),
            catchError((error) => {
              this.logger.error(
                `Failed to get unread messages count - User ID: ${client.userId}`,
                error.stack,
              );
              throw error;
            }),
          ),
      );

      client.emit('unread_messages_count', {
        chatId: chatId,
        count: unreadMessagesCount,
      });
    } catch (error) {
      this.logger.error(
        `Failed to fetch unread messages count - User ID: ${client.userId}`,
        error.stack,
      );

      if (error instanceof WsException) {
        throw error;
      }

      throw new WsException('Failed to fetch unread messages count');
    }
  }

  @SubscribeMessage('user_is_typing')
  async handleUserIsTyping(
    @ConnectedSocket() client: SocketWithUserId,
    @MessageBody() data: { isTyping: boolean; chatId: string },
  ) {
    const { isTyping, chatId } = data;
    console.log('typing', data);
    try {
      client.to(chatId).emit('user_is_typing', {
        userId: client.userId,
        isTyping,
      });
    } catch (error) {
      this.logger.error(
        `Failed to notify typing status - User ID: ${client.userId}`,
        error.stack,
      );

      if (error instanceof WsException) {
        throw error;
      }

      throw new WsException('Failed to notify typing status');
    }
  }
}
