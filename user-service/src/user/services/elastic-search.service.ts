import { QueryDslQueryContainer } from '@elastic/elasticsearch/lib/api/types';
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
        userId: profile.userId,
        username: profile.username,
        avatarUrl: profile.avatarUrl,
        firstName: profile.firstName,
        lastName: profile.lastName,
        createdAt: profile.createdAt,
      },
    });
  }

  async searchProfiles(query: string, currentUserId: string) {
    const searchQuery: QueryDslQueryContainer = {
      bool: {
        must: [
          {
            bool: {
              should: [
                { wildcard: { username: `*${query.toLowerCase()}*` } },
                {
                  match: {
                    username: {
                      query: query.toLowerCase(),
                      fuzziness: 2,
                    },
                  },
                },
              ],
              minimum_should_match: 1,
            },
          },
        ],
      },
    };

    if (currentUserId) {
      searchQuery.bool.must_not = [
        {
          term: {
            'userId.keyword': currentUserId,
          },
        },
      ];
    }

    try {
      const { hits } = await this.elasticsearchService.search({
        index: 'profiles',
        query: searchQuery,
        sort: [{ createdAt: 'desc' }],
        size: 10,
      });

      return hits.hits.map((hit) => hit._source);
    } catch (error) {
      console.error('Elasticsearch search error:', error);
      return [];
    }
  }
}
