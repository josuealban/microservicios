import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { Role } from '../enums/role.enum';

export class AuthenticatedUser {
  userId!: number;
  email!: string;
  role!: Role;
}

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): AuthenticatedUser => {
    const request = ctx.switchToHttp().getRequest<{ user: AuthenticatedUser }>();
    return request.user;
  },
);

