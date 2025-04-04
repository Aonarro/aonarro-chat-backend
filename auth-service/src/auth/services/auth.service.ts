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
import * as argon2 from 'argon2';
import { ClientProxy } from '@nestjs/microservices';
import { Request, Response } from 'express';
import { LoginDto } from '../../auth/dto/login.dto';
import { ConfigService } from '@nestjs/config';
import { TokenService } from './token.service';
import { TokenType, User } from '../../../prisma/__generated__';

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
  ) {}

  public async register(
    registerDto: RegisterDto,
  ): Promise<{ message: string }> {
    const isUserExist = await this.getUserDataByEmail(registerDto.email);

    if (isUserExist) {
      throw new ConflictException('User with this email already exists');
    }

    const hashedPassword = await this.hashPassword(registerDto.password);

    const user = await this.prismaService.user.create({
      data: {
        email: registerDto.email,
        password: hashedPassword,
      },
    });

    this.userClient.emit('create_user', {
      userId: user.id,
      username: registerDto.username,
    });

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

    if (!user.isVerified) {
      const existingToken = await this.tokenService.findTokenByEmail(
        user.email,
      );

      if (existingToken) {
        return {
          message:
            'Please check your inbox (including the "Spam" folder). If you haven’t received the email, try requesting the code again in a few minutes.',
          verifyEmail: true,
        };
      }

      const token = await this.tokenService.generateToken(
        loginDto.email,
        TokenType.VERIFICATION,
        15,
      );

      this.notificationClient.emit('send_verification_email', {
        email: loginDto.email,
        token,
      });

      throw new UnauthorizedException(
        'Please verify your email before logging in',
      );
    }

    return await this.authenticateAndSaveSession(
      req,
      user,
      'Thank you for coming back! We are glad to see you again.',
    );
  }

  public async logOut(req: Request, res: Response): Promise<void> {
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

          resolve();
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

    const isValidPassword = await argon2.verify(user.password, password);
    return isValidPassword ? user : null;
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

  private async hashPassword(password: string): Promise<string> {
    return await argon2.hash(password);
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
