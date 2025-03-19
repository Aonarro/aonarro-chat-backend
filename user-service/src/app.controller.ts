import { Controller, Get, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('test')
  getHello(@Req() req: Request): string {
    console.log(req.headers);
    return this.appService.getHello();
  }
}
