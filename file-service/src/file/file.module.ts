import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ProfileAvatarConsumer } from './controllers/file.controller';
import { FileService } from './services/file.service';
import { RabbitMQModule } from 'src/config/rabbitmq/rabbitmq.module';
import { AwsModule } from './aws.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    RabbitMQModule,
    AwsModule,
  ],
  controllers: [ProfileAvatarConsumer],
  providers: [FileService],
})
export class FileModule {}
