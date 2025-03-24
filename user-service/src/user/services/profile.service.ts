import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../config/prisma/prisma.service';
import { CreateProfileDto } from '../dto/create-profile.dto';

@Injectable()
export class ProfileService {
  constructor(private readonly prismaService: PrismaService) {}

  async createProfile(userId: string, createProfileDto: CreateProfileDto) {
    return console.log(userId, createProfileDto);
  }

  async getProfile() {}

  async updateProfile() {}
}
