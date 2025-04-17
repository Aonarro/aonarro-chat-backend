import { Controller, Logger } from '@nestjs/common';
import { ProfileService } from '../services/profile.service';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';

@Controller('profile')
export class UserController {
  private readonly logger = new Logger(UserController.name);
  constructor(private readonly profileService: ProfileService) {}

  @MessagePattern('get_user_profile')
  async getUserProfileForAuth(@Payload() data: { userId: string }) {
    const { userId } = data;
    try {
      const profile = await this.profileService.getProfile(userId);
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
}
