import { Controller, Logger } from '@nestjs/common';
import { ProfileService } from '../services/profile.service';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';

@Controller('profile')
export class UserController {
  private readonly logger = new Logger(UserController.name);

  constructor(private readonly profileService: ProfileService) {}

  @MessagePattern('get_user_profile')
  async getUserProfileForAuth(
    @Payload() data: { userId?: string; username?: string },
  ) {
    const { userId, username } = data;

    try {
      if (!data.username && !data.userId) {
        throw new RpcException({
          code: 'INVALID_INPUT',
          message: 'Either username or userId must be provided',
        });
      }

      const profile = await this.profileService.getProfile(userId, username);
      console.log(`PROFILE FOR${username}`, profile);
      return { success: true, profile: profile };
    } catch (error) {
      if (error instanceof RpcException) {
        throw error;
      }

      throw new RpcException({
        message: error.message || 'Failed to get profile',
        code: 'PROFILE_FETCHING_FAILED',
        status: error.status || 500,
      });
    }
  }

  @MessagePattern('verify_users_friends')
  async areUsersFriends(
    @Payload() data: { currentUserId: string; friendUserId: string },
  ) {
    const { currentUserId, friendUserId } = data;

    try {
      if (!currentUserId || !friendUserId) {
        throw new RpcException({
          code: 'INVALID_INPUT',
          message: 'Both currentUserId and friendUserId must be provided',
        });
      }

      const areFriends = await this.profileService.areUsersFriends(
        currentUserId,
        friendUserId,
      );

      return { success: true, areFriends };
    } catch (error) {
      if (error instanceof RpcException) {
        throw error;
      }

      throw new RpcException({
        message: error.message || 'Failed to verify friends',
        code: 'FRIENDS_VERIFICATION_FAILED',
        status: error.status || 500,
      });
    }
  }
}
