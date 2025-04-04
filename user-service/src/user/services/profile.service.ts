import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../config/prisma/prisma.service';
import { UpdateProfileDto } from '../dto/update-profile.dto';
import { Profile } from '../../../prisma/__generated__';

@Injectable()
export class ProfileService {
  constructor(private readonly prismaService: PrismaService) {}

  async createProfile(userId: string, username: string) {
    return this.prismaService.profile.create({
      data: {
        userId: userId,
        username: username,
      },
    });
  }

  async getProfile(
    userId: string,
  ): Promise<Omit<Profile, 'createdAt' | 'updatedAt'>> {
    return this.prismaService.profile.findUnique({
      where: {
        userId: userId,
      },
      omit: {
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async updateProfile(
    userId: string,
    updateProfileDto: UpdateProfileDto,
  ): Promise<Omit<Profile, 'createdAt' | 'updatedAt'>> {
    return this.prismaService.profile.update({
      where: {
        userId: userId,
      },
      data: updateProfileDto,
      omit: {
        createdAt: true,
        updatedAt: true,
      },
    });
  }
}
