import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
} from '@nestjs/common';
import { ConfirmationDto } from '../../auth/dto/confirmation.dto';
import { Request } from 'express';
import { EmailConfirmationService } from '../services/email-confirmation.service';

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
