import { PrismaService } from '@/config/prisma/prisma.service';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_SERVICE') private readonly userClient: ClientProxy,
    private readonly prismaService: PrismaService,
  ) {}

  async setLastUserLogin(userId: string) {
    this.userClient.emit('user_last_login', {
      userId,
      loginTime: new Date().toISOString(),
    });
  }

  async getUserProfile(userId: string) {
    const userProfile = await firstValueFrom(
      this.userClient.send('get_user_profile', { userId }),
    );

    return userProfile;
  }

  async changeUserEmail(userId: string, newEmail: string) {
    return await this.prismaService.user.update({
      where: {
        id: userId,
      },
      data: {
        email: newEmail,
      },
    });
  }
}
