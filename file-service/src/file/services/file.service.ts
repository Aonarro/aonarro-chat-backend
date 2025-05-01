import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { S3Service } from './aws-s3.service';

@Injectable()
export class FileService {
  private readonly logger = new Logger(FileService.name);
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

  async uploadMessageFile(userId: string, fileBuffer: Buffer) {
    const key = `messages/${userId}-${Date.now()}.jpg`;

    try {
      this.logger.log(`Uploading message file for user: ${userId}`);
      const { key: fullKey, url } = await this.s3Service.uploadFile({
        key,
        file: fileBuffer,
        isPublic: false,
        metadata: { userId },
      });

      this.logger.log(`Successfully uploaded message file: ${key}`);
      return { key: fullKey, url };
    } catch (error) {
      this.logger.error(`Failed to upload message file: ${key}`, error.stack);
      throw new InternalServerErrorException('Failed to upload message file');
    }
  }

  async getFileUrls(fileKeys: string[]) {
    try {
      this.logger.log(`Fetching URLs for file keys: ${fileKeys}`);
      const urls = await Promise.all(
        fileKeys.map((key) => this.s3Service.getFileUrl(key, false)),
      );
      this.logger.log(`Successfully fetched URLs for file keys`);
      console.log(urls);
      return urls;
    } catch (error) {
      this.logger.error(`Failed to fetch file URLs`, error.stack);
      throw new InternalServerErrorException('Failed to fetch file URLs');
    }
  }
}
