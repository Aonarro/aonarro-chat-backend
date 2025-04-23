import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, firstValueFrom, timeout } from 'rxjs';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @Inject('USER_SERVICE')
    private readonly userClient: ClientProxy,
  ) {}

  async getUserProfileByUsername(username: string) {
    try {
      const response = await firstValueFrom(
        this.userClient.send('get_user_profile', { username }).pipe(
          timeout(5000),
          catchError((error) => {
            this.logger.error(`User lookup failed for ${username}`, error);
            throw new RpcException({
              message: 'User service unavailable',
              code: 'USER_SERVICE_ERROR',
            });
          }),
        ),
      );

      if (!response?.success) {
        throw new RpcException('User not found');
      }

      return response.profile;
    } catch (error) {
      this.logger.error(`Failed to fetch profile for ${username}`, error.stack);
      throw new RpcException({
        message: error.message,
        code: error.code || 'PROFILE_FETCH_ERROR',
      });
    }
  }

  async areUsersFriends(currentUserId: string, friendUserId: string) {
    try {
      const response = await firstValueFrom(
        this.userClient
          .send('verify_users_friends', { currentUserId, friendUserId })
          .pipe(
            timeout(5000),
            catchError((error) => {
              this.logger.error(
                `Friendship verification failed for users ${currentUserId} and ${friendUserId}`,
                error,
              );
              throw new RpcException({
                message: 'User service unavailable',
                code: 'USER_SERVICE_ERROR',
              });
            }),
          ),
      );

      if (!response?.success) {
        return false;
      }

      return response.areFriends;
    } catch (error) {
      this.logger.error(
        `Failed to verify friendship for users ${currentUserId} and ${friendUserId}`,
        error.stack,
      );
      throw new RpcException({
        message: error.message,
        code: error.code || 'FRIENDSHIP_VERIFICATION_ERROR',
      });
    }
  }
}
