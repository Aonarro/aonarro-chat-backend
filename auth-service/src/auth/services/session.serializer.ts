import { PassportSerializer } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private readonly authService: AuthService) {
    super();
  }

  serializeUser(user: any, done: (err: Error, user: any) => void): void {
    done(null, user.id);
  }

  async deserializeUser(
    id: string,
    done: (err: Error, payload: any) => void,
  ): Promise<void> {
    try {
      const user = await this.authService.getUserDataById(id);
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  }
}
