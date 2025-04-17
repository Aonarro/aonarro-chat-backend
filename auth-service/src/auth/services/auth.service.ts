import { UtilityFunctions } from './../../utils/functions/UtilityFunctions';
import {
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../../config/prisma/prisma.service';
import { RegisterDto } from '../../auth/dto/register.dto';
import { ClientProxy } from '@nestjs/microservices';
import { Request, Response } from 'express';
import { LoginDto } from '../../auth/dto/login.dto';
import { ConfigService } from '@nestjs/config';
import { TokenService } from './token.service';
import { TokenType, User } from '../../../prisma/__generated__';
import { catchError, firstValueFrom, timeout } from 'rxjs';
import { UserService } from './user.service';
import { PasswordService } from './password.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly tokenService: TokenService,
    @Inject('NOTIFICATION_SERVICE')
    private readonly notificationClient: ClientProxy,
    @Inject('USER_SERVICE')
    private readonly userClient: ClientProxy,
    private readonly configService: ConfigService,
    private readonly userService: UserService,
    private readonly utilityFunctions: UtilityFunctions,
    private readonly passwordService: PasswordService,
  ) {}

  public async register(
    registerDto: RegisterDto,
  ): Promise<{ message: string }> {
    const isUserExist = await this.getUserDataByEmail(registerDto.email);

    if (isUserExist) {
      throw new ConflictException('User with this email already exists');
    }

    const hashedPassword = await this.passwordService.hashPassword(
      registerDto.password,
    );

    try {
      await this.prismaService.$transaction(async (prisma) => {
        const user = await prisma.user.create({
          data: {
            email: registerDto.email,
            password: hashedPassword,
          },
        });

        try {
          await firstValueFrom(
            this.userClient
              .send('create_user', {
                userId: user.id,
                username: registerDto.username,
                email: registerDto.email,
              })
              .pipe(
                timeout(5000),
                catchError((error) => {
                  throw error;
                }),
              ),
          );
        } catch (error) {
          await prisma.user.delete({
            where: { id: user.id },
          });
          this.utilityFunctions.parseRpcError(error);
        }
      });
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new ConflictException('Registration failed: ' + error.message);
    }

    // EMAIL VERIFICATION

    const token = await this.tokenService.generateToken(
      registerDto.email,
      TokenType.VERIFICATION,
      15,
    );

    this.notificationClient.emit('send_verification_email', {
      email: registerDto.email,
      token,
    });

    return {
      message: 'You successfully registered, please confirm your email',
    };
  }

  public async login(
    req: Request,
    loginDto: LoginDto,
  ): Promise<
    void | { message: string } | { message: string; verifyEmail: boolean }
  > {
    const user = req.user as User;

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const { success, profile } = await this.userService.getUserProfile(user.id);

    if (!success) {
      throw new InternalServerErrorException('Failed to load user profile');
    }

    const isTwoFactorEnabled = profile.settings.isTwoFactorEnabled;

    if (!user.isVerified) {
      const result = await this.utilityFunctions.handleUnverifiedEmail(
        loginDto.email,
      );
      if (result) return result;

      return {
        message: 'Please verify your email',
        verifyEmail: true,
      };
    }

    if (user.isVerified && isTwoFactorEnabled) {
      if (success) {
        const result = await this.utilityFunctions.handleUnverifiedEmail(
          loginDto.email,
        );
        if (result) return result;

        return {
          message: 'Please verify your email',
          verifyEmail: true,
        };
      } else {
        throw new InternalServerErrorException();
      }
    }

    return await this.authenticateAndSaveSession(
      req,
      user,
      'Thank you for coming back! We are glad to see you again.',
    );
  }

  public async logOut(
    req: Request,
    res: Response,
  ): Promise<{ message: string }> {
    return new Promise((resolve, reject) => {
      if (!req.isAuthenticated()) {
        reject(new UnauthorizedException('User is not authenticated'));
        return;
      }

      req.logout((err) => {
        if (err) {
          reject(new InternalServerErrorException('Logout process failed'));
          return;
        }

        req.session.destroy((err) => {
          if (err) {
            reject(
              new InternalServerErrorException('Session destruction failed'),
            );
            return;
          }

          res.clearCookie(this.configService.getOrThrow('SESSION_NAME'), {
            httpOnly: true,
            sameSite: 'lax',
          });

          resolve({ message: 'Logout successful' });
        });
      });
    });
  }

  public async validateUser(
    email: string,
    password: string,
  ): Promise<User | null> {
    const user = await this.getUserDataByEmail(email);
    if (!user || !user.password) {
      return null;
    }

    const isValidPassword = this.passwordService.isPasswordValid(
      user.password,
      password,
    );
    return isValidPassword ? user : null;
  }

  public async checkCurrentPassword(email: string, password: string) {
    const userData = await this.getUserDataByEmail(email);
    const isPasswordValid = await this.passwordService.isPasswordValid(
      userData.password,
      password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Incorrect password');
    }

    return {
      message: 'Password is valid, now you can change your sensitive data',
    };
  }

  public async authenticateAndSaveSession(
    req: Request,
    user: User,
    message?: string,
  ): Promise<void | { message: string }> {
    return new Promise((resolve, reject) => {
      req.logIn(user, async (err) => {
        if (err) {
          return reject(new InternalServerErrorException());
        }

        await this.saveSession(req);
        this.userService.setLastUserLogin(user.id);
        resolve(message ? { message: message } : null);
      });
    });
  }

  public async saveSession(req: Request): Promise<void> {
    return new Promise((resolve, reject) => {
      req.session.save((err) => {
        if (err) {
          return reject(new InternalServerErrorException());
        } else {
          resolve();
        }
      });
    });
  }

  public async getUserDataByEmail(email: string): Promise<User | undefined> {
    return this.prismaService.user.findFirst({
      where: {
        email: email,
      },
    });
  }

  public async getUserDataById(
    id: string,
  ): Promise<Omit<User, 'password'> | undefined> {
    return this.prismaService.user.findFirst({
      where: {
        id: id,
      },
      omit: {
        password: true,
      },
    });
  }
}
