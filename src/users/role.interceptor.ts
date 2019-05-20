import {
  ClassSerializerInterceptor,
  PlainLiteralObject,
  Injectable,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { ClassTransformOptions } from 'class-transformer';
import { User } from './user.entity';

const addRole = (options, role: string) => {
  if (!options) {
    options = { groups: [] };
  } else if (!options.groups) {
    options.groups = [];
  } else if (options.groups.includes(role)) {
    return options;
  }
  options.groups.push(role);
  return options;
};

@Injectable()
export class RoleInterceptor extends ClassSerializerInterceptor {
  private user: User;
  intercept(context: ExecutionContext, next: CallHandler) {
    this.user = context.getArgs()[2].req.user;
    return super.intercept(context, next);
  }
  serialize(
    response: PlainLiteralObject | PlainLiteralObject[],
    options: ClassTransformOptions,
  ) {
    // TODO: add user roles: options = addRole(options, 'admin');
    return super.serialize(response, options);
  }
  transformToPlain(plainOrClass: any, options: ClassTransformOptions) {
    const res = plainOrClass as User;
    if (this.user && res.email === this.user.email) {
      options = addRole(options, 'owner');
    }
    return super.transformToPlain(plainOrClass, options);
  }
}
