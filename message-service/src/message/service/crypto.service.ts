import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';

@Injectable()
export class EncryptionService {
  private readonly algorithm = 'aes-256-cbc';
  private readonly key: Buffer;
  private readonly ivLength = 16;

  constructor(private readonly configService: ConfigService) {
    const secretKey = this.configService.get<string>('MESSAGE_SECRET_KEY');
    if (!secretKey) {
      throw new InternalServerErrorException(
        'MESSAGE_SECRET_KEY is not defined in environment',
      );
    }

    const keyBuffer = Buffer.from(secretKey, 'hex');
    if (keyBuffer.length !== 32) {
      throw new InternalServerErrorException(
        'MESSAGE_SECRET_KEY must be a 64-character hex string (32 bytes)',
      );
    }

    this.key = keyBuffer;
  }

  encrypt(plainText: string): string {
    const iv = crypto.randomBytes(this.ivLength);
    const cipher = crypto.createCipheriv(this.algorithm, this.key, iv);
    let encrypted = cipher.update(plainText, 'utf-8', 'base64');
    encrypted += cipher.final('base64');
    const ivBase64 = iv.toString('base64');
    return `${ivBase64}:${encrypted}`;
  }

  decrypt(encryptedText: string): string {
    const [ivBase64, encrypted] = encryptedText.split(':');
    if (!ivBase64 || !encrypted) {
      throw new Error('Invalid encrypted text format');
    }

    const iv = Buffer.from(ivBase64, 'base64');
    const decipher = crypto.createDecipheriv(this.algorithm, this.key, iv);
    let decrypted = decipher.update(encrypted, 'base64', 'utf-8');
    decrypted += decipher.final('utf-8');
    return decrypted;
  }
}
