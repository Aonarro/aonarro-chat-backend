import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';

import { Profile } from 'prisma/__generated__';
import { ProfileResponse } from 'src/utils/types/types';

@Injectable()
export class ElasticSearchService {
  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  async indexUserProfile(profile: Profile | ProfileResponse) {
    await this.elasticsearchService.index({
      index: 'profiles',
      id: profile.id,
      document: {
        username: profile.username,
        avatarUrl: profile.avatarUrl,
        firstName: profile.firstName,
        lastName: profile.lastName,
        createdAt: profile.createdAt,
      },
    });
  }

  async searchProfiles(query: string) {
    const { hits } = await this.elasticsearchService.search({
      index: 'profiles',
      query: {
        bool: {
          should: [
            { wildcard: { username: `*${query}*` } },
            { match: { username: { query, fuzziness: 2 } } },
          ],
        },
      },
      sort: [{ createdAt: 'desc' }],
      size: 10,
    });

    return hits.hits.map((hit) => hit._source);
  }
}
