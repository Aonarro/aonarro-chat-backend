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
import { SocketWithUserId } from 'src/utils/types/types';
import { parse } from 'cookie';
import { PresenceService } from '../service/presence.service';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, firstValueFrom, timeout } from 'rxjs';
import { CreateMessageDto } from '../dto/create-message.dto';
import { WsValidationFilter } from 'src/utils/ws-validation.filter';

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
@UseFilters(WsValidationFilter)
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
        throw new UnauthorizedException('Session cookie not found');
      }

      const parsedCookies = parse(cookies);
      const sessionCookie = parsedCookies['session'];

      const sessionId = sessionCookie.startsWith('s:')
        ? sessionCookie.slice(2).split('.')[0]
        : sessionCookie.split('.')[0];

      const userId = await this.authService.validateSession(sessionId);
      client.userId = userId;

      client.emit('connection_success', { status: 'connected' });
      await this.presenceService.setUserOnline(userId);
      this.userClient.emit('user_last_login', {
        userId: userId,
        loginTime: new Date().toISOString(),
      });
    } catch (error) {
      this.logger.error('Authentication failed', error);
      client.disconnect();
    }
  }

  async handleDisconnect(@ConnectedSocket() client: SocketWithUserId) {
    console.log(`Client disconnected: ${client.id}`);

    await this.presenceService.setUserOffline(client.userId);
  }

  @SubscribeMessage('user_online')
  async handleUserOnline(@ConnectedSocket() client: SocketWithUserId) {
    console.log(`User is online client: ${client.userId}`);
    await this.presenceService.setUserOnline(client.userId);
  }

  @SubscribeMessage('user_isIdle')
  async handleUserIsIdle(@ConnectedSocket() client: SocketWithUserId) {
    await this.presenceService.setUserIsIdle(client.userId);
  }

  @SubscribeMessage('create_or_get_chat')
  async createOrGetChat(
    @ConnectedSocket() client: SocketWithUserId,
    @MessageBody() data: { username: string },
  ) {
    try {
      this.logger.log('Is chatClient connected?', this.chatClient['connected']);

      const currentUserId = client.userId;
      this.logger.log(
        `Starting chat for ${currentUserId} with ${data.username}`,
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
              this.logger.error('RabbitMQ communication error', error);
              throw new WsException('Chat service unavailable');
            }),
          ),
      );

      client.emit('chat_ready', chat);
    } catch (error) {
      this.logger.error('Chat creation failed', {
        error: error.message,
        stack: error.stack,
      });
    }
  }

  @SubscribeMessage('send_message')
  async sendMessage(
    @ConnectedSocket() client: SocketWithUserId,
    @MessageBody() createMessageDto: CreateMessageDto,
  ) {}
}
