// import { Injectable, CanActivate, ExecutionContext,ForbiddenException  } from '@nestjs/common';
// import { Reflector } from '@nestjs/core';
// import { UserRole  } from '../user/entities/user.entity';
// import { ROLES_KEY } from './current-user.decortor';

// @Injectable()
// export class RolesGuard implements CanActivate {
//   constructor(private reflector: Reflector) {}

//   canActivate(context: ExecutionContext): boolean {
//     const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
//       ROLES_KEY, [
//       context.getHandler(),
//       context.getClass(),
//     ]);
//     if (!requiredRoles) 
//       return true;
//     const { user } = context.switchToHttp().getRequest();
//     if (!user || !user.role) {
//       throw new ForbiddenException('User role not found');
//     }
    
//     return requiredRoles.includes(user.role);
//   }
// }

import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);