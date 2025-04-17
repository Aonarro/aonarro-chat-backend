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
      }),
    }),
  ],
  exports: [ElasticsearchModule],
})
export class ElasticSearchModule {}
