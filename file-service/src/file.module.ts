import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RabbitMQModule } from './config/rabbitmq/rabbitmq.module';
import { ProfileAvatarConsumer } from './file/controllers/file.controller';
import { ProfileAvatarService } from './file/services/file.service';
import { AwsModule } from './file/aws.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    RabbitMQModule,
    AwsModule,
  ],
  controllers: [ProfileAvatarConsumer],
  providers: [ProfileAvatarService],
})
export class FileModule {}
