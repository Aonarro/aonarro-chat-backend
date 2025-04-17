import { Module } from '@nestjs/common';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ElasticsearchModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        node: `http://elasticsearch:${configService.get('ELASTICSEARCH_PORT')}`,
        auth: {
          username: configService.getOrThrow('ELASTICSEARCH_USERNAME'),
          password: configService.getOrThrow('ELASTICSEARCH_PASSWORD'),
        },
        maxRetries: 5,
        requestTimeout: 60000,
        pingTimeout: 60000,
      }),
    }),
  ],

  exports: [ElasticsearchModule],
})
export class ElasticSearchModule {}
