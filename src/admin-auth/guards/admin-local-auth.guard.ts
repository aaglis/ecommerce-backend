import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AdminLocalAuthGuard extends AuthGuard('local-admin') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(err, user, info, context) {
    const request = context.switchToHttp().getRequest();
    console.log('o que está chegando no admin local guard: ', user);
    if (err || !user) {
      throw new UnauthorizedException(err?.message || 'Unauthorized');
    }
    console.log('passou no admin local guard');
    request.admin = user;
    return user;
  }
}
