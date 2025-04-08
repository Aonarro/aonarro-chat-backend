import {
  Body,
  Controller,
  Get,
  Patch,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { SessionAuthGuard } from '../../utils/guards/session-auth.guard';
import { RequestWithUserId } from '../../utils/type/types';
import { ProfileService } from '../services/profile.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateProfileDto } from '../dto/create-profile.dto';
import { UpdateProfileDto } from '../dto/update-profile.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileValidationPipe } from 'src/utils/pipes/file-validation.pipe';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @MessagePattern('create_user')
  async createProfile(@Payload() data: CreateProfileDto) {
    try {
      await this.profileService.createProfile(data.userId, data.username);
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  @Get()
  @UseGuards(SessionAuthGuard)
  getUserProfile(@Req() req: RequestWithUserId) {
    const userId = req.userId;
    return this.profileService.getProfile(userId);
  }

  @Patch()
  @UseGuards(SessionAuthGuard)
  @UseInterceptors(FileInterceptor('avatar'))
  updateUserProfile(
    @Req() req: RequestWithUserId,
    @Body() updateProfileDto: UpdateProfileDto,
    @UploadedFile(new FileValidationPipe()) avatarFile?: Express.Multer.File,
  ) {
    const userId = req.userId;

    const payload = {
      ...updateProfileDto,
      ...(avatarFile && { avatar: avatarFile }),
    };
    return this.profileService.updateProfile(userId, payload);
  }
}
