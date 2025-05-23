import { Inject, Injectable, Logger } from '@nestjs/common';

import { ClientProxy } from '@nestjs/microservices';
import { catchError, firstValueFrom, timeout } from 'rxjs';
import { UtilityFunctions } from 'src/utils/functions/UtilityFunctions';

@Injectable()
export class FileService {
  private readonly logger = new Logger(FileService.name);
  constructor(
    @Inject('FILE_SERVICE') private readonly fileClient: ClientProxy,
    private readonly utilityFunctions: UtilityFunctions,
  ) {}

  async saveAvatarToStore(userId: string, avatarBuffer: Buffer) {
    this.logger.log(
      `Dispatching message to RabbitMQ to store avatar in S3 for userId: ${userId}`,
    );
    try {
      const avatarUrl = await firstValueFrom(
        this.fileClient.send('upload-avatar', { userId, avatarBuffer }).pipe(
          timeout(5000),
          catchError((error) => {
            throw error;
          }),
        ),
      );
      return avatarUrl;
    } catch (error) {
      this.utilityFunctions.parseRpcError(error);
    }
  }

  async deleteExistingAvatar(key: string) {
    this.logger.log(`Dispatching message to RabbitMQ to delete avatar in S3`);
    this.fileClient.emit('delete-avatar', { key });
  }
}
