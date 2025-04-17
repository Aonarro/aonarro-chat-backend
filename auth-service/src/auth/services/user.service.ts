import { PrismaService } from '@/config/prisma/prisma.service';
import { UtilityFunctions } from '@/utils/functions/UtilityFunctions';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, firstValueFrom, timeout } from 'rxjs';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_SERVICE') private readonly userClient: ClientProxy,
    private readonly prismaService: PrismaService,
    private readonly utilityFunctions: UtilityFunctions,
  ) {}

  async setLastUserLogin(userId: string) {
    this.userClient.emit('user_last_login', {
      userId,
      loginTime: new Date().toISOString(),
    });
  }

  async getUserProfile(userId: string) {
    try {
      const userProfile = await firstValueFrom(
        this.userClient.send('get_user_profile', { userId }).pipe(
          timeout(5000),
          catchError((error) => {
            throw error;
          }),
        ),
      );

      return userProfile;
    } catch (error) {
      this.utilityFunctions.parseRpcError(error);
    }
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
