import {
  Body,
  Controller,
  Get,
  Logger,
  Patch,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { SessionAuthGuard } from '../../utils/guards/session-auth.guard';
import { RequestWithUserId } from '../../utils/types/types';
import { ProfileService } from '../services/profile.service';
import {
  EventPattern,
  MessagePattern,
  Payload,
  RpcException,
} from '@nestjs/microservices';
import { CreateProfileDto } from '../dto/create-profile.dto';
import { UpdateProfileDto } from '../dto/update-profile.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileValidationPipe } from 'src/utils/pipes/file-validation.pipe';
import { FormDataJsonPipe } from 'src/utils/pipes/form-data-json.pipe';

@Controller('profile')
export class ProfileController {
  private readonly logger = new Logger(ProfileController.name);
  constructor(private readonly profileService: ProfileService) {}

  @EventPattern('user_last_login')
  async handleLastLoginUpdate(
    @Payload() data: { userId: string; loginTime: string },
  ) {
    try {
      await this.profileService.lastLoginAt(data);
      this.logger.log(`Updated last login for user ${data.userId}`);
    } catch (error) {
      this.logger.error(
        `Failed to update last login for user ${data.userId}: ${error.message}`,
      );
    }
  }

  @MessagePattern('create_user')
  async createProfile(@Payload() data: CreateProfileDto) {
    try {
      await this.profileService.createProfile(data);
      return { status: 'success' };
    } catch (error) {
      this.logger.error(`Profile creation failed for user ${data.userId}`, {
        error: error.message,
        stack: error.stack,
        username: data.username,
        errorCode: error.code,
      });

      if (error instanceof RpcException) {
        throw error;
      }

      if (error.code === 'P2002') {
        throw new RpcException({
          code: 'USERNAME_EXISTS',
          message: 'Username already taken',
          status: 409,
        });
      }

      throw new RpcException({
        code: 'INTERNAL_ERROR',
        message: 'Failed to create profile',
        status: 500,
      });
    }
  }

  @Get()
  @UseGuards(SessionAuthGuard)
  getMyProfile(@Req() req: RequestWithUserId) {
    const userId = req.userId;
    return this.profileService.getProfile(userId);
  }

  @Patch()
  @UseGuards(SessionAuthGuard)
  @UseInterceptors(FileInterceptor('avatar'))
  updateMyProfile(
    @Req() req: RequestWithUserId,
    @Body(FormDataJsonPipe) updateProfileDto: UpdateProfileDto,
    @UploadedFile(new FileValidationPipe()) avatar?: Express.Multer.File,
  ) {
    const userId = req.userId;

    const payload = {
      ...(updateProfileDto ?? {}),
      ...(avatar && { avatar }),
    };

    return this.profileService.updateProfile(userId, payload);
  }
}
