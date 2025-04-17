import { AuthService } from './auth.service';
import { ConflictException, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../config/prisma/prisma.service';
import { FileService } from './file.service';
import { CreateProfileDto } from '../dto/create-profile.dto';
import { ProfileResponse, UpdateProfilePayload } from 'src/utils/types/types';
import { ElasticSearchService } from './elastic-search.service';

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
    return await this.prismaService.profile.update({
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
      this.logger.log(
        `Profile created successfully for userId: ${data.userId}`,
      );
      const createdProfile = await this.prismaService.profile.create({
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

      await this.elasticSearchService.indexUserProfile(createdProfile);
    } catch (error) {
      this.logger.error(
        `Failed to create profile: ${error.message}`,
        error.stack,
      );
      if (error.code === 'P2002') {
        throw new ConflictException('Username already exists');
      }
      throw error;
    }
  }

  async getProfile(userId: string): Promise<ProfileResponse> {
    this.logger.log(`Fetching profile for userId: ${userId}`);
    const profile = await this.prismaService.profile.findUnique({
      where: {
        userId: userId,
      },
      omit: {
        updatedAt: true,
        settingsId: true,
        userId: true,
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
      return await this.prismaService.$transaction(async (prisma) => {
        //Email changing
        if (email) {
          this.logger.log(`Updating email for userId: ${userId}`);
          const response = await this.authService.changeUserEmail(
            userId,
            email,
          );

          if (!response.success) {
            this.logger.error(
              `Failed to change email for userId: ${userId}: ${response.message}`,
            );
            throw new ConflictException(
              response.message || 'Failed to change email in auth service',
            );
          }

          await prisma.profile.update({
            where: { userId: userId },
            data: { email },
          });
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
        return { message: 'Profile updated successfully' };
      });
    }

    return { message: 'Profile updated successfully' };
  }
}
