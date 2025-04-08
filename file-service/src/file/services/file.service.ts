import { Injectable } from '@nestjs/common';
import { S3Service } from './aws-s3.service';

@Injectable()
export class ProfileAvatarService {
  constructor(public readonly s3Service: S3Service) {}

  async uploadUserAvatar(userId: string, avatarBuffer: Buffer) {
    const key = `avatars/${userId}.jpg`;

    const { url } = await this.s3Service.uploadFile({
      key,
      file: avatarBuffer,
      isPublic: true,
      metadata: {
        userId,
      },
    });

    return url;
  }

  async deleteUserAvatar(key: string) {
    this.s3Service.deleteFile(key);
  }
}
