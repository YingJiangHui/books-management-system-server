import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';
import { Role } from './role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  
  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const request= context.switchToHttp().getRequest();
    const {user} = request
    //返回 false 的守卫会抛出一个 HttpException 异常。如果您想要向最终用户返回不同的错误响应，你应该抛出一个异常 如 `throw new UnauthorizedException()`
    // 由守卫引发的任何异常都将由异常层(全局异常过滤器和应用于当前上下文的任何异常过滤器)处理。
    return requiredRoles.some((role) => user.roles?.includes(role));
  }
}
