import { Controller } from '@nestjs/common';

import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
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
      if (error instanceof RpcException) {
        throw error;
      }

      throw new RpcException({
        message: error.message || 'Failed to change email',
        code: 'EMAIL_CHANGING_FAILED',
        status: error.status || 500,
      });
    }
  }
}
