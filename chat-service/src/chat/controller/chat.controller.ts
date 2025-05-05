import { Controller, Logger } from '@nestjs/common';
import { ChatService } from '../service/chat.service';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { UserService } from '../service/user.service';
import { PresenceService } from '../service/presence.service';

@Controller()
export class ChatController {
  private logger = new Logger(ChatController.name);

  constructor(
    private readonly chatService: ChatService,
    private readonly userService: UserService,
    private readonly presenceService: PresenceService,
  ) {}

  @MessagePattern('create_or_get_chat')
  async createOrGetChat(
    @Payload() data: { currentUserId: string; username: string },
  ) {
    const { currentUserId, username } = data;
    console.log(
      'create_or_get_chat from chat service',
      currentUserId,
      username,
    );

    try {
      const friendProfile =
        await this.userService.getUserProfileByUsername(username);

      if (!friendProfile) {
        console.log('not friend');

        throw new RpcException(`User ${username} not found`);
      }

      if (!username) {
        throw new RpcException('Username is required');
      }

      const friendUserId = friendProfile.userId;

      const areFriends = await this.userService.areUsersFriends(
        currentUserId,
        friendUserId,
      );
      if (!areFriends) {
        throw new RpcException('You are not friends with this user');
      }

      let isNewChat = false;

      let chat = await this.chatService.findExistingChat(
        currentUserId,
        friendUserId,
      );

      if (!chat) {
        chat = await this.chatService.createNewChat(
          currentUserId,
          friendUserId,
        );
        isNewChat = true;
      }

      const friendStatus =
        await this.presenceService.getUserStatus(friendUserId);

      const { email: _email, settings, ...cleanFriendProfile } = friendProfile;
      const { isTwoFactorEnabled: _isTwoFactorEnabled, ...cleanSettings } =
        settings;

      const formattedChat = {
        id: chat.id,
        createdAt: chat.createdAt,
        updatedAt: chat.updatedAt,
        isGroup: chat.isGroup,
        lastMessageId: chat.lastMessageId,
        participantProfile: {
          ...cleanFriendProfile,
          settings: cleanSettings,
          status: friendStatus,
        },
      };

      return { isNewChat: isNewChat, chat: formattedChat };
    } catch (error) {
      this.logger.error('Error in createOrGetChat', error.stack);

      throw new RpcException({
        message:
          error.message || 'An error occurred while creating or getting chat',
        code: error.code || 'CHAT_CREATION_ERROR',
      });
    }
  }

  @MessagePattern('get_all_chats')
  async getAllChatsForUser(@Payload() data: { userId: string }) {
    console.log('get_all_chats from chat service');
    const { userId } = data;
    const chats = await this.chatService.getAllChatsForUser(userId);
    return chats;
  }
}
