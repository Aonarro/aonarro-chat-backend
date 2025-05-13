import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, firstValueFrom, timeout } from 'rxjs';

@Injectable()
export class FileService {
  private readonly logger = new Logger(FileService.name);

  constructor(
    @Inject('FILE_SERVICE')
    private readonly fileClient: ClientProxy,
  ) {}

  async uploadMessageFile(
    file: {
      name: string;
      type: string;
      data: number[];
    },
    userId: string,
  ) {
    return await firstValueFrom(
      this.fileClient
        .send('upload_message_file', {
          userId: userId,
          fileData: Buffer.from(file.data),
        })
        .pipe(
          timeout(15000),
          catchError((error) => {
            this.logger.error(
              `File upload failed - User ID: ${userId}`,
              error.stack,
            );
            throw new RpcException('File upload failed');
          }),
        ),
    );
  }

  async getFileUrls(fileKeys: string[]) {
    return await firstValueFrom(
      this.fileClient.send('get_file_urls', { fileKeys }).pipe(
        timeout(10000),
        catchError((error) => {
          this.logger.error('Failed to fetch file URLs', error.stack);
          throw new RpcException('Failed to fetch file URLs');
        }),
      ),
    );
  }
}
