import {
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from '../../auth/decorators/is-public.decorator';
import { UnauthorizedError } from '../../auth/errors/unauthorized.error';

@Injectable()
export class AdminOrSuperAdminJwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext): Promise<boolean> | boolean {
    // Verifica se a rota é pública
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // Permite acesso tanto para superAdmin quanto admin
    if (user?.role !== 'superAdmin' && user?.role !== 'admin') {
      throw new ForbiddenException(
        'Apenas Super Admins ou Admins podem realizar essa ação.',
      );
    }

    const canActivate = super.canActivate(context);

    if (typeof canActivate === 'boolean') {
      return canActivate;
    }

    const canActivatePromise = canActivate as Promise<boolean>;

    return canActivatePromise.catch((error) => {
      if (error instanceof UnauthorizedError) {
        throw new UnauthorizedException(error.message);
      }

      throw new UnauthorizedException();
    });
  }
}
