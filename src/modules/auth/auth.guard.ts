import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { JWTConstants } from './constants';
import { Reflector } from '@nestjs/core';
import { Auth, Role } from './auth.decorator';
import { User } from '../users/models/user.entity';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
   console.log("GUAAAARD")
    const roles = this.reflector.get(Auth, context.getHandler());
    const request = context.switchToHttp().getRequest();

    const token = this.extractTokenFromHeader(request);

    if (!token) {
      if (!roles) return true;
      throw new UnauthorizedException();
    }

    try {
      const user = await this.jwtService.verifyAsync(token, {
        secret: JWTConstants.secret,
      });

      request['user'] = user;
      console.log('GUARD', user);
      return this.authorize(roles, user as User);
    } catch {
      throw new UnauthorizedException();
    }
  }

  authorize(roles: Role[], user: User): boolean {
    if (!roles) return true;
  }

  extractTokenFromHeader(request: Request) {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
