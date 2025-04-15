import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { getConfirmationTemplate } from './templates/confirmation.template';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);
  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  public async sendConfirmationEmail(data: { email: string; token: string }) {
    const html = getConfirmationTemplate(data.token);
    this.logger.log(
      `📩 Sending verification email to: ${data.email} - ${data.token}`,
    );
    return this.sendMail(data.email, 'Email verification', html);
  }

  private async sendMail(email: string, subject: string, html: string) {
    try {
      const result = await this.mailerService.sendMail({
        to: email,
        subject,
        html,
      });

      this.logger.log(`✅ Email successfully sent to: ${email}`);
      return result;
    } catch (error) {
      this.logger.error(
        `❌ Failed to send email to: ${email}. Error: ${error.message}`,
        error.stack,
      );
      throw new Error(`Failed to send email: ${error.message}`);
    }
  }
}
