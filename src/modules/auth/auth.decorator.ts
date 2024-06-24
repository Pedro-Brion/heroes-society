import { Reflector } from '@nestjs/core';

export enum Role {
  USER = 'User',
  ADMIN = 'ADMIN',
}

export const Auth = Reflector.createDecorator<Role[]>();
