import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class SessionAuthGuard extends AuthGuard('session') {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();

    if (!req.isAuthenticated() || !req.user) {
      throw new UnauthorizedException('User is not authenticated');
    }

    console.log('test', req.isAuthenticated());

    return true;
  }
}
