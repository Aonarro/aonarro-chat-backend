import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Req,
  UseGuards,
  Res,
  Get,
} from '@nestjs/common';
import { RegisterDto } from '../../auth/dto/register.dto';
import { LoginDto } from '../../auth/dto/login.dto';
import { Request, Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { SessionAuthGuard } from '../../utils/guards/session-auth.guard';
import { IUser } from '../../utils/types/types';
import { AuthService } from '../services/auth.service';
import { ConfirmPasswordDto } from '../dto/confirm-password.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.OK)
  public async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  @UseGuards(AuthGuard('local'))
  @HttpCode(HttpStatus.OK)
  public async login(@Req() req: Request, @Body() loginDto: LoginDto) {
    return this.authService.login(req, loginDto);
  }

  @Post('check-password')
  @UseGuards(SessionAuthGuard)
  checkAuth(
    @Req() req: Request,
    @Body() confirmPasswordDto: ConfirmPasswordDto,
  ) {
    const userEmail = (req.user as IUser).email;
    return this.authService.checkCurrentPassword(
      userEmail,
      confirmPasswordDto.password,
    );
  }

  @Get('current-user-id')
  @UseGuards(SessionAuthGuard)
  async getCurrentUserId(@Req() req: Request) {
    const currentUser = req.user as IUser;

    return {
      currentUserId: currentUser.id,
    };
  }

  @Get('check-status')
  @UseGuards(SessionAuthGuard)
  checkUserLogInStatus() {
    console.log('check user status');

    return {
      message: 'You are logged in',
    };
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  public async logout(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.logOut(req, res);
  }
}
