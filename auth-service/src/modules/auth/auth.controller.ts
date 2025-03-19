import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Req,
  UseGuards,
  Get,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Request, Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { SessionAuthGuard } from '../../utils/guards/session-auth.guard';
import { IUser } from '../../utils/types/types';

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

  @Get('check')
  @UseGuards(SessionAuthGuard)
  checkAuth(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const userId = (req.user as IUser).id;
    res.setHeader('X-User-Id', userId);
    return { isAuthenticated: true };
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
