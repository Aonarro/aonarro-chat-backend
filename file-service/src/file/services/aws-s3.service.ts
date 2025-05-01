import { Injectable, Logger } from '@nestjs/common';
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  HeadObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { ConfigService } from '@nestjs/config';
import * as path from 'path';

@Injectable()
export class S3Service {
  private readonly client: S3Client;
  private readonly bucket: string;
  private readonly logger = new Logger(S3Service.name);

  private readonly allowedExtensions = ['.jpg', '.jpeg', '.png', '.webp'];
  private readonly extensionToMimeType: Record<string, string> = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.webp': 'image/webp',
  };

  constructor(private config: ConfigService) {
    this.bucket = this.config.get('aws.bucket');

    this.client = new S3Client({
      region: config.get('aws.region'),
      credentials: this.config.get('aws.credentials'),
    });

    this.logger.log(
      `Initialized S3 client with region: ${this.config.get('aws.region')} and bucket: ${this.bucket}`,
    );
  }

  async uploadFile(params: {
    key: string;
    file: Buffer;
    isPublic?: boolean;
    metadata?: Record<string, string>;
  }) {
    this.logger.log(`Preparing to upload file: ${params.key}`);

    const pathPrefix = params.isPublic
      ? this.config.get<string>('aws.paths.public')
      : this.config.get<string>('aws.paths.private');

    this.logger.log(`File path prefix: ${pathPrefix}`);

    const ext = path.extname(params.key).toLowerCase();

    if (!this.allowedExtensions.includes(ext)) {
      throw new Error(`Unsupported image extension: ${ext}`);
    }

    const mimeType = this.extensionToMimeType[ext];

    console.log({
      Bucket: this.bucket,
      Key: `${pathPrefix}${params.key}`,
      Body: params.file,
      Metadata: params.metadata,
      ContentType: mimeType,
    });

    const command = new PutObjectCommand({
      Bucket: this.bucket,
      Key: `${pathPrefix}${params.key}`,
      Body: params.file,
      Metadata: params.metadata,
      ContentType: mimeType,
    });

    try {
      this.logger.log(`Uploading file: ${params.key} to S3...`);
      await this.client.send(command);
      this.logger.log(`File uploaded successfully: ${params.key}`);
    } catch (error) {
      this.logger.error(`Error uploading file: ${params.key}`, error.stack);
      throw error;
    }

    const fileUrl = await this.getFileUrl(
      `${pathPrefix}${params.key}`,
      params.isPublic,
    );
    this.logger.log(`File URL generated: ${fileUrl}`);

    return {
      key: `${pathPrefix}${params.key}`,
      url: fileUrl,
    };
  }

  async getFileUrl(key: string, isPublic: boolean): Promise<string> {
    this.logger.log(`Generating URL for file: ${key}`);

    if (isPublic) {
      this.logger.log(
        `Public file URL: https://${this.bucket}.s3.amazonaws.com/${key}`,
      );
      return `https://${this.bucket}.s3.amazonaws.com/${key}`;
    }

    try {
      const signedUrl = await getSignedUrl(
        this.client,
        new GetObjectCommand({
          Bucket: this.bucket,
          Key: key,
        }),
        { expiresIn: 3600 },
      );
      this.logger.log(`Generated signed URL for private file: ${signedUrl}`);
      return signedUrl;
    } catch (error) {
      this.logger.error(
        `Error generating signed URL for file: ${key}`,
        error.stack,
      );
      throw error;
    }
  }

  async checkExistingFile(key: string): Promise<boolean> {
    try {
      await this.client.send(
        new HeadObjectCommand({
          Bucket: this.bucket,
          Key: key,
        }),
      );

      return true;
    } catch (error) {
      if (error.name === 'NotFound') {
        return false;
      }
      this.logger.error(`Error checking file existence: ${key}`, error.stack);
      throw error;
    }
  }

  async deleteFile(key: string): Promise<void> {
    const exists = await this.checkExistingFile(key);

    if (!exists) {
      this.logger.warn(`File not found, skipping delete: ${key}`);
      return;
    }

    try {
      await this.client.send(
        new DeleteObjectCommand({
          Bucket: this.bucket,
          Key: key,
        }),
      );

      this.logger.log(`File deleted successfully: ${key}`);
    } catch (error) {
      this.logger.error(`Error deleting file: ${key}`, error.stack);
      throw error;
    }
  }
}
