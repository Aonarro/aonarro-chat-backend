import { Controller } from '@nestjs/common';

import { AuthService } from '../services/auth.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class UserController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('get_user_email')
  async getUserEmail(@Payload() data: { userId: string }) {
    console.log('getUserEmail', data);
    const { userId } = data;
    const userData = await this.authService.getUserDataById(userId);
    return userData;
  }
}
