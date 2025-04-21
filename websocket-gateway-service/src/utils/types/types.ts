import { Socket } from 'socket.io';
import { CreateMessageDto } from 'src/web-socket-gateway/dto/create-message.dto';

export interface SocketWithUserId extends Socket {
  userId?: string;
}

export interface ValidationErrorResponse {
  errors: string[];
  originalData: CreateMessageDto;
}
