import { Inject, Injectable, Logger } from '@nestjs/common';

import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class FileService {
  private readonly logger = new Logger(FileService.name);
  constructor(
    @Inject('FILE_SERVICE') private readonly fileClient: ClientProxy,
  ) {}

  async saveAvatarToStore(userId: string, avatarBuffer: Buffer) {
    this.logger.log(
      `Dispatching message to RabbitMQ to store avatar in S3 for userId: ${userId}`,
    );
    const avatarUrl = await firstValueFrom(
      this.fileClient.send('upload-avatar', { userId, avatarBuffer }),
    );
    return avatarUrl;
  }

  async deleteExistingAvatar(key: string) {
    this.logger.log(`Dispatching message to RabbitMQ to delete avatar in S3`);
    this.fileClient.emit('delete-avatar', { key });
  }
}
