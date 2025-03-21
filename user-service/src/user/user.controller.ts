import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Req,
  UseGuards,
} from '@nestjs/common';
import { SessionAuthGuard } from '../utils/guards/session-auth.guard';
import { Request } from 'express';

export interface ExtendedRequest extends Request {
  userId?: string; // `userId` теперь есть в `req`
}

@Controller('test')
export class UserController {
  constructor() {}

  @Get()
  @UseGuards(SessionAuthGuard)
  @HttpCode(HttpStatus.OK)
  public async newVerification(@Req() req: ExtendedRequest) {
    console.log(req.userId);
    return;
  }
}
