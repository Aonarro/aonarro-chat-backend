import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ProfileService } from '../services/profile.service';

@Controller()
export class ChatController {
  constructor(private readonly profileService: ProfileService) {}

  @MessagePattern('get_users_by_ids')
  async getUsersByIds(@Payload() data: { userIds: string[] }) {
    const { userIds } = data;
    console.log('userIds: ', userIds);
    const users = await this.profileService.findUsersByIds(userIds);
    console.log('get_users_by_ids: ', users);
    return users;
  }
}
