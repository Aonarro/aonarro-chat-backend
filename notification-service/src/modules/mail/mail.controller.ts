import { Controller, Logger } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { MailService } from './mail.service';

@Controller()
export class MailController {
  private readonly logger = new Logger(MailController.name);
  constructor(private readonly mailService: MailService) {}

  @EventPattern('send_verification_email')
  public async sendConfirmationEmail(
    @Payload() data: { email: string; token: string },
  ) {
    this.logger.log(
      `Received 'send_verification_email' event for email: ${data.email}`,
    );
    return this.mailService.sendConfirmationEmail(data);
  }
}
