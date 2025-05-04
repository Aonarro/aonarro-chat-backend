import { AuthService } from './auth.service';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from '../../config/prisma/prisma.service';
import { FileService } from './file.service';
import { CreateProfileDto } from '../dto/create-profile.dto';
import { ProfileResponse, UpdateProfilePayload } from 'src/utils/types/types';
import { ElasticSearchService } from './elastic-search.service';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class ProfileService {
  private readonly logger = new Logger(ProfileService.name);

  constructor(
    private readonly prismaService: PrismaService,
    private readonly authService: AuthService,
    private readonly fileService: FileService,
    private readonly elasticSearchService: ElasticSearchService,
  ) {}

  async lastLoginAt(data) {
    this.logger.log(`Updating last login at for userId: ${data.userId}`);
    return this.prismaService.profile.update({
      where: { userId: data.userId },
      data: {
        lastLoginAt: new Date(data.loginTime),
        updatedAt: new Date(),
      },
    });
  }

  async createProfile(data: CreateProfileDto) {
    this.logger.log(`Creating profile for userId: ${data.userId}`);

    try {
      await this.prismaService.$transaction(async (prisma) => {
        const createdProfile = await prisma.profile.create({
          data: {
            userId: data.userId,
            username: data.username,
            email: data.email,
            settings: {
              create: {},
            },
          },
        });

        this.logger.log(
          `Profile created successfully for userId: ${data.userId}`,
        );

        try {
          await this.elasticSearchService.indexUserProfile(createdProfile);
        } catch (elasticError) {
          this.logger.error(
            `ElasticSearch index error: ${elasticError.message}`,
            elasticError.stack,
          );
          throw new RpcException({
            code: 'ELASTICSEARCH_ERROR',
            message: 'Failed to index profile in ElasticSearch',
            status: 500,
          });
        }
      });
    } catch (error) {
      this.logger.error(
        `Profile creation failed: ${error.message}`,
        error.stack,
      );

      throw error;
    }
  }

  async getProfile(
    userId?: string,
    username?: string,
  ): Promise<ProfileResponse> {
    if (!userId && !username) {
      throw new Error('Either userId or username must be provided');
    }
    const whereCondition = username ? { username } : { userId };

    this.logger.log(
      `Fetching profile for ${username ? 'username: ' + username : 'userId: ' + userId}`,
    );
    const profile = await this.prismaService.profile.findUnique({
      where: whereCondition,
      omit: {
        updatedAt: true,
        settingsId: true,
      },
      include: {
        settings: {
          omit: {
            id: true,
          },
        },
      },
    });

    if (!profile) {
      this.logger.warn(`Profile not found for userId: ${userId}`);
    } else {
      this.logger.log(`Successfully fetched profile for userId: ${userId}`);
    }

    return profile;
  }

  async updateProfile(userId: string, payload: UpdateProfilePayload) {
    this.logger.log(`Updating profile for userId: ${userId}`);
    const { settings, email, username, avatar, ...profileData } = payload;

    const profile = await this.getProfile(userId);

    if (email) {
      this.logger.log(`Checking if email ${email} is already in use`);
      const existingUser = await this.prismaService.profile.findFirst({
        where: {
          email: email,
        },
      });

      if (existingUser && existingUser.userId !== userId) {
        this.logger.warn(`Email ${email} is already taken by another user`);
        throw new ConflictException('Email already in use');
      }
    }

    if (username) {
      this.logger.log(`Checking if username ${username} is already in use`);
      const existingUserWithUsername =
        await this.prismaService.profile.findFirst({
          where: { username },
        });
      if (
        existingUserWithUsername &&
        existingUserWithUsername.userId !== userId
      ) {
        this.logger.warn(
          `Username ${username} is already taken by another user`,
        );
        throw new ConflictException('Username already in use');
      }
    }

    if (email || Object.keys(profileData).length > 0 || avatar || settings) {
      this.logger.log(`Applying profile updates for userId: ${userId}`);
      await this.prismaService.$transaction(async (prisma) => {
        //Email changing
        if (email) {
          this.logger.log(`Updating email for userId: ${userId}`);
          try {
            await this.authService.changeUserEmail(userId, email);

            await prisma.profile.update({
              where: { userId: userId },
              data: { email },
            });
          } catch (error) {
            this.logger.error(
              `Error while changing email for userId: ${userId}`,
              error.stack,
            );
            throw error;
          }
        }

        if (username) {
          this.logger.log(`Updating username for userId: ${userId}`);
          await prisma.profile.update({
            where: { userId: userId },
            data: { username },
          });
        }

        // firstName, lastName, bio changing

        if (Object.keys(profileData).length > 0) {
          this.logger.log(`Updating profile fields for userId: ${userId}`);
          await prisma.profile.update({
            where: { userId: userId },
            data: profileData,
          });
        }

        //Avatar changing

        if (avatar) {
          this.logger.log(`Updating avatar for userId: ${userId}`);

          try {
            if (profile.avatarUrl) {
              const parsedUrl = new URL(profile.avatarUrl);
              const key = parsedUrl.pathname.slice(1);
              this.logger.log(`Deleting old avatar with key: ${key}`);
              await this.fileService.deleteExistingAvatar(key);
            }

            const avatarBuffer = avatar.buffer;
            const avatarUrl = await this.fileService.saveAvatarToStore(
              userId,
              avatarBuffer,
            );

            await prisma.profile.update({
              where: { userId: userId },
              data: { avatarUrl },
            });
          } catch (error) {
            this.logger.error(
              `Failed to update avatar for userId: ${userId}`,
              error.stack,
            );
            throw error;
          }
        }

        //Settings changing

        if (settings) {
          this.logger.log(`Updating settings for userId: ${userId}`);
          await prisma.profile.update({
            where: { userId: userId },
            data: {
              settings: {
                update: {
                  ...settings,
                },
              },
            },
          });
        }
        this.logger.log(`Profile successfully updated for userId: ${userId}`);
      });
    }

    try {
      const updatedProfile = await this.getProfile(userId);
      console.log(updatedProfile);

      const elasticSearchPromise =
        this.elasticSearchService.indexUserProfile(updatedProfile);
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(
          () => reject(new Error('Elasticsearch update timed out')),
          5000,
        ),
      );

      await Promise.race([elasticSearchPromise, timeoutPromise]);
    } catch (error) {
      this.logger.error(
        'Failed to update Elasticsearch with new profile data',
        error.stack,
      );
      throw new InternalServerErrorException('Failed to update Elasticsearch');
    }

    return { message: 'Profile updated successfully' };
  }

  async findUsersByIds(userIds: string[]) {
    return this.prismaService.profile.findMany({
      where: {
        userId: {
          in: userIds,
        },
      },
      select: {
        id: true,
        userId: true,
        username: true,
        avatarUrl: true,
      },
    });
  }

  async areUsersFriends(
    currentUserId: string,
    otherUserId: string,
  ): Promise<boolean> {
    try {
      if (currentUserId === otherUserId) {
        this.logger.warn(
          `[Friendship Check] Attempted to check friendship with self`,
          {
            action: 'check_friendship',
            currentUserId,
            otherUserId,
          },
        );
        return false;
      }

      const friendship = await this.prismaService.friendship.findFirst({
        where: {
          OR: [
            {
              AND: [
                { user1: { userId: currentUserId } },
                { user2: { userId: otherUserId } },
              ],
            },
            {
              AND: [
                { user1: { userId: otherUserId } },
                { user2: { userId: currentUserId } },
              ],
            },
          ],
        },
      });

      this.logger.log(`[Friendship Check] Verified friendship status`, {
        action: 'check_friendship',
        currentUserId,
        otherUserId,
        areFriends: !!friendship,
      });

      return !!friendship;
    } catch (error) {
      this.logger.error(
        `[Friendship Check] Failed to verify friendship status`,
        {
          action: 'check_friendship',
          currentUserId,
          otherUserId,
          errorType: error.name,
          errorMessage: error.message,
          errorStack: error.stack,
        },
      );
      throw new RpcException({
        message: 'Failed to verify friendship status',
        code: 'FRIENDSHIP_CHECK_FAILED',
      });
    }
  }
}
