import { Controller } from '@nestjs/common';
import { ProfileAvatarService } from '../services/file.service';
import {
  EventPattern,
  MessagePattern,
  Payload,
  RpcException,
} from '@nestjs/microservices';

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

    try {
      const AvatarBuffer = Buffer.from(avatarBuffer.data);

      const avatarUrl = await this.fileService.uploadUserAvatar(
        userId,
        AvatarBuffer,
      );
      return avatarUrl;
    } catch (error) {
      throw new RpcException({
        message: error.message || 'Failed to upload avatar',
        code: 'AVATAR_UPLOAD_FAILED',
        status: error.status || 500,
      });
    }
  }

  @EventPattern('delete-avatar')
  async deleteAvatar(@Payload() data: { key: string }) {
    this.fileService.deleteUserAvatar(data.key);
  }
}
