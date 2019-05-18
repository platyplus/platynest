import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class IsAuthenticated extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    // add your custom authentication logic here.
    // for example, call super.logIn(request) to establish a session.
    return super.canActivate(context);
  }

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context).getContext();
    if (ctx) {
      return ctx.req;
    } else {
      return context.switchToHttp().getRequest();
    }
  }

  handleRequest(err, user, info) {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
