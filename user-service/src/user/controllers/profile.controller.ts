import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { SessionAuthGuard } from '../../utils/guards/session-auth.guard';
import { RequestWithUserId } from '../../utils/type/types';
import { ProfileService } from '../services/profile.service';
import { EventPattern, Payload } from '@nestjs/microservices';
import { CreateProfileDto } from '../dto/create-profile.dto';
import { UpdateProfileDto } from '../dto/update-profile.dto';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @EventPattern('create_user')
  async createProfile(@Payload() data: CreateProfileDto) {
    return this.profileService.createProfile(data.userId, data.username);
  }

  @Get()
  @UseGuards(SessionAuthGuard)
  getUserProfile(@Req() req: RequestWithUserId) {
    const userId = req.userId;
    return this.profileService.getProfile(userId);
  }

  @Patch()
  @UseGuards(SessionAuthGuard)
  updateUserProfile(
    @Req() req: RequestWithUserId,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    const userId = req.userId;
    return this.profileService.updateProfile(userId, updateProfileDto);
  }
}
