import { Controller } from '@nestjs/common';
import { FileService } from '../services/file.service';
import {
  EventPattern,
  MessagePattern,
  Payload,
  RpcException,
} from '@nestjs/microservices';

@Controller('profile-avatar')
export class ProfileAvatarConsumer {
  constructor(private readonly fileService: FileService) {}

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

  @MessagePattern('upload_message_file')
  async uploadMessageFile(
    @Payload()
    payload: {
      userId: string;
      fileData: { type: 'Buffer'; data: number[] };
    },
  ) {
    const { userId, fileData } = payload;
    console.log('FILE SERVICE PAYLOAD', payload);
    try {
      const messageFileBuffer = Buffer.from(fileData.data);
      console.log('Buffer', messageFileBuffer);
      return await this.fileService.uploadMessageFile(
        userId,
        messageFileBuffer,
      );
    } catch (error) {
      throw new RpcException({
        message: error.response?.message || 'File upload failed',
        code: 'MESSAGE_FILE_UPLOAD_FAILED',
        status: error.status || 500,
      });
    }
  }

  @MessagePattern('get_file_urls')
  async getFileUrls(@Payload() data: { fileKeys: string[] }) {
    const { fileKeys } = data;
    try {
      const fileUrls = await this.fileService.getFileUrls(fileKeys);
      return fileUrls;
    } catch (error) {
      throw new RpcException({
        message: error.response?.message || 'Failed to fetch file URLs',
        code: 'FILE_URLS_FETCH_FAILED',
        status: error.status || 500,
      });
    }
  }
}
