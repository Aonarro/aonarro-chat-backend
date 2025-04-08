import { UserService } from './user.service';
import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../config/prisma/prisma.service';
import { UpdateProfileDto } from '../dto/update-profile.dto';
import { FileService } from './file.service';

@Injectable()
export class ProfileService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly userService: UserService,
    private readonly fileService: FileService,
  ) {}

  async createProfile(userId: string, username: string) {
    try {
      return await this.prismaService.profile.create({
        data: {
          userId: userId,
          username: username,
        },
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('Username already exists');
      }
      throw error;
    }
  }

  async getProfile(userId: string) {
    const userData = await this.userService.getUserData(userId);

    const profile = await this.prismaService.profile.findUnique({
      where: {
        userId: userId,
      },
      omit: {
        updatedAt: true,
      },
    });

    if (!userData) {
      return profile;
    } else {
    }

    return {
      ...profile,
      email: userData.email,
    };
  }

  async updateProfile(
    userId: string,
    updateProfileDto: UpdateProfileDto,
  ): Promise<{ message: string }> {
    const { avatar, ...profileData } = updateProfileDto;
    const profile = await this.getProfile(userId);

    // Only for profileData without avatar
    if (Object.keys(profileData).length > 0) {
      await this.prismaService.profile.update({
        where: { userId },
        data: profileData,
      });
    }

    //Only for avatar
    if (avatar) {
      if (profile.avatarUrl) {
        const parsedUrl = new URL(profile.avatarUrl);
        const key = parsedUrl.pathname.slice(1);

        this.fileService.deleteExistingAvatar(key);
      }

      const avatarBuffer = avatar.buffer;
      const avatarUrl = await this.fileService.saveAvatarToStore(
        userId,
        avatarBuffer,
      );

      await this.prismaService.profile.update({
        where: { userId },
        data: {
          avatarUrl: avatarUrl,
        },
      });
    }

    return { message: 'Profile updated successfully' };
  }
}
