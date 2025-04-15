import { Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';

@Injectable()
export class PasswordService {
  constructor() {}
  public async hashPassword(password: string): Promise<string> {
    return await argon2.hash(password);
  }

  public async isPasswordValid(oldPassword: string, newPassword: string) {
    return await argon2.verify(oldPassword, newPassword);
  }
}
