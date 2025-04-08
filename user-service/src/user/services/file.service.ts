import { Inject, Injectable } from '@nestjs/common';

import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class FileService {
  constructor(
    @Inject('FILE_SERVICE') private readonly fileClient: ClientProxy,
  ) {}

  async saveAvatarToStore(userId: string, avatarBuffer: Buffer) {
    const avatarUrl = await firstValueFrom(
      this.fileClient.send('upload-avatar', { userId, avatarBuffer }),
    );
    return avatarUrl;
  }

  async deleteExistingAvatar(key: string) {
    this.fileClient.emit('delete-avatar', { key });
  }
}
