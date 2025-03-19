import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
} from '@nestjs/common';
import { ConfirmationDto } from './dto/confirmation.dto';
import { EmailConfirmationService } from './email-confirmation.service';
import { Request } from 'express';

@Controller('email-confirmation')
export class EmailConfirmationController {
  constructor(
    private readonly emailConfirmationService: EmailConfirmationService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  public async newVerification(
    @Req() req: Request,
    @Body() confirmationDto: ConfirmationDto,
  ) {
    return this.emailConfirmationService.newVerification(req, confirmationDto);
  }
}
