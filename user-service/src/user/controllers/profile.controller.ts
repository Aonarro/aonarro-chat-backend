import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { SessionAuthGuard } from '../../utils/guards/session-auth.guard';
import { ExtendedRequest } from '../../utils/type/types';
import { ProfileService } from '../services/profile.service';
import { CreateProfileDto } from '../dto/create-profile.dto';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post()
  @UseGuards(SessionAuthGuard)
  async createProfile(
    @Req() req: ExtendedRequest,
    @Body() createProfileDto: CreateProfileDto,
  ) {
    const userId = req.userId;
    return this.profileService.createProfile(userId, createProfileDto);
  }

  @Get()
  @UseGuards(SessionAuthGuard)
  @HttpCode(HttpStatus.OK)
  public async newVerification(@Req() req: ExtendedRequest) {
    console.log('User ID:', req.userId);
    return;
  }
}
