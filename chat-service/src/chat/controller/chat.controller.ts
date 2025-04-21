import { Controller } from '@nestjs/common';
import { ChatService } from '../service/chat.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserService } from '../service/user.service';

@Controller()
export class ChatController {
  constructor(
    private readonly chatService: ChatService,
    private readonly userService: UserService,
  ) {}

  @MessagePattern('create_or_get_chat')
  async createOrGetChat(
    @Payload() data: { currentUserId: string; username: string },
  ) {
    const { currentUserId, username } = data;

    const friendProfile =
      await this.userService.getUserProfileByUsername(username);

    const friendUserId = friendProfile.userId;

    let chat = await this.chatService.findExistingChat(
      currentUserId,
      friendUserId,
    );

    if (!chat) {
      chat = await this.chatService.createNewChat(currentUserId, friendUserId);
    }

    return chat;
  }
}
