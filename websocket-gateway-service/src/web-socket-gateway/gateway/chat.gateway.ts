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

@WebSocketGateway({
  namespace: '/chat-ws',
  path: '/socket.io',
  withCredentials: true,
  cors: {
    origin: ['http://localhost:3000'],
  },
  transports: ['websocket', 'polling'],
  allowEIO3: true,
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
      await this.presenceService.setUserStatus(userId, UserStatusEnum.ONLINE);
      this.logger.log(`User status updated to ONLINE - User ID: ${userId}`);

      this.userClient.emit('user_last_login', {
        userId: userId,
        loginTime: new Date().toISOString(),
      });
      this.logger.log(`Last login time recorded - User ID: ${userId}`);
      this.server.emit('user_status_updated', {
        userId: client.userId,
        status: UserStatusEnum.ONLINE,
      });
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
      await this.presenceService.setUserStatus(
        client.userId,
        UserStatusEnum.OFFLINE,
      );
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
    // this.logger.log(
    //   `Processing status change request - User ID: ${client.userId}, New Status: ${data.status}`,
    // );
    try {
      await this.presenceService.setUserStatus(client.userId, data.status);
      // this.logger.log(
      //   `Status successfully updated - User ID: ${client.userId}, Status: ${data.status}`,
      // );

      this.server.emit('user_status_updated', {
        userId: client.userId,
        status: data.status,
      });
      // this.logger.log(
      //   `Status update notification sent - User ID: ${client.userId}`,
      // );
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
    // this.logger.log(
    //   `Initiating chat creation/retrieval - Initiator: ${client.userId}, Target User: ${data.username}`,
    // );

    try {
      // this.logger.debug(
      //   `Checking chatClient connection status: ${this.chatClient['connected']}`,
      // );

      const currentUserId = client.userId;
      // this.logger.debug(
      //   `Sending request to chat service - Initiator: ${currentUserId}, Target: ${data.username}`,
      // );

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

      // this.logger.log(
      //   `Chat successfully processed - Chat ID: ${chat.id}, Initiator: ${currentUserId}`,
      // );
      setTimeout(() => {
        client.emit('chat_ready', { chat: chat, requestId: data.requestId });
      }, 1000);
    } catch (error) {
      this.logger.error(
        `Chat operation failed - Initiator: ${client.userId}`,
        error.stack,
      );
      // Если ошибка уже является WsException, пробрасываем её как есть
      if (error instanceof WsException) {
        throw error;
      }
      // Если это другой тип ошибки, оборачиваем в WsException
      throw new WsException(error.message || 'Chat operation failed');
    }
  }

  @SubscribeMessage('get_all_chats')
  async getAllChats(@ConnectedSocket() client: SocketWithUserId) {
    // this.logger.log(
    //   `Fetching all chats request received - User ID: ${client.userId}`,
    // );

    try {
      const userId = client.userId;
      // this.logger.debug(`Querying chats for user - User ID: ${userId}`);

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

      // this.logger.log(
      //   `Successfully retrieved ${chats.length} chats for User ID: ${userId}`,
      // );
      client.emit('chats_list', chats);
    } catch (error) {
      this.logger.error(
        `Failed to fetch chats - User ID: ${client.userId}`,
        error.stack,
      );
      throw new WsException('Failed to fetch chats');
    }
  }

  @SubscribeMessage('join_room')
  handleJoinRoom(
    @ConnectedSocket() client: SocketWithUserId,
    @MessageBody() data: { chatId: string },
  ) {
    const { chatId } = data;
    this.logger.debug(
      `Join room request - User ID: ${client.userId}, Chat ID: ${chatId}`,
    );

    client.join(chatId);
    this.logger.log(
      `User successfully joined room - User ID: ${client.userId}, Chat ID: ${chatId}`,
    );
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
}
