import { Controller } from '@nestjs/common';

import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserService } from '../services/user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern('change_user_email')
  async changeUserEmail(@Payload() data: { userId: string; newEmail: string }) {
    const { userId, newEmail } = data;
    try {
      await this.userService.changeUserEmail(userId, newEmail);
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
}
