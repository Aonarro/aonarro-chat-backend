import { Controller } from '@nestjs/common';
import { ProfileAvatarService } from '../services/file.service';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';

@Controller('profile-avatar')
export class ProfileAvatarConsumer {
  constructor(private readonly fileService: ProfileAvatarService) {}

  @MessagePattern('upload-avatar')
  async uploadAvatar(
    @Payload()
    data: {
      userId: string;
      avatarBuffer: { type: 'Buffer'; data: number[] };
    },
  ) {
    const { avatarBuffer, userId } = data;

    const AvatarBuffer = Buffer.from(avatarBuffer.data);

    const avatarUrl = await this.fileService.uploadUserAvatar(
      userId,
      AvatarBuffer,
    );
    return avatarUrl;
  }

  @EventPattern('delete-avatar')
  async deleteAvatar(@Payload() data: { key: string }) {
    this.fileService.deleteUserAvatar(data.key);
  }
}
