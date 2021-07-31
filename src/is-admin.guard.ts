import { ExecutionContext, Injectable, CanActivate } from '@nestjs/common'

@Injectable()
export class IsAdminGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest()
    console.log(request)
    return request.headers?.authorization  === process.env.TOKEN
  }
}
