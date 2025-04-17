import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { S3Service } from './aws-s3.service';

@Injectable()
export class ProfileAvatarService {
  private readonly logger = new Logger(ProfileAvatarService.name);
  constructor(public readonly s3Service: S3Service) {}

  async uploadUserAvatar(userId: string, avatarBuffer: Buffer) {
    const key = `avatars/${userId}.jpg`;

    try {
      this.logger.log(`Uploading avatar for user: ${userId}`);
      const { url } = await this.s3Service.uploadFile({
        key,
        file: avatarBuffer,
        isPublic: true,
        metadata: {
          userId,
        },
      });

      this.logger.log(
        `Successfully uploaded avatar for user: ${userId} - URL: ${url}`,
      );

      return url;
    } catch (error) {
      this.logger.error(
        `Failed to upload avatar for user: ${userId}`,
        error.stack,
      );
      throw new InternalServerErrorException('Failed to upload user avatar');
    }
  }

  async deleteUserAvatar(key: string) {
    try {
      this.logger.log(`Deleting avatar with key: ${key}`);
      this.s3Service.deleteFile(key);
      this.logger.log(`Successfully deleted avatar with key: ${key}`);
    } catch (error) {
      this.logger.error(
        `Failed to delete avatar with key: ${key}`,
        error.stack,
      );
    }
  }
}
