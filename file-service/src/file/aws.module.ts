// src/shared/aws/aws.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { S3Service } from './services/aws-s3.service';
import awsConfig from '../config/storage/storage.config';

@Module({
  imports: [ConfigModule.forFeature(awsConfig)],
  providers: [S3Service],
  exports: [S3Service],
})
export class AwsModule {}
