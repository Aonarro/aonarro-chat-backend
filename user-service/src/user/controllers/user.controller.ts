import { Controller, Logger } from '@nestjs/common';
import { ProfileService } from '../services/profile.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('profile')
export class UserController {
  private readonly logger = new Logger(UserController.name);
  constructor(private readonly profileService: ProfileService) {}

  @MessagePattern('get_user_profile')
  async getUserProfileForAuth(@Payload() data: { userId: string }) {
    try {
      const { userId } = data;
      const profile = await this.profileService.getProfile(userId);
      return { success: true, profile: profile };
    } catch (err) {
      return { success: false, message: err.message };
    }
  }
}
