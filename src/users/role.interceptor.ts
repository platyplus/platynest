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
    // console.log(context.getArgs());
    // console.log(context.switchToHttp());
    return super.intercept(context, next);
  }
  serialize(
    response: PlainLiteralObject | PlainLiteralObject[],
    options: ClassTransformOptions,
  ) {
    // options = addRole(options, 'admin');
    return super.serialize(response, options);
  }
  transformToPlain(plainOrClass: any, options: ClassTransformOptions) {
    // TODO: inject the user and check if reponse.email === user.email
    const res = plainOrClass as User;
    if (this.user && res.email === this.user.email) {
      options = addRole(options, 'owner');
    }
    console.log('ici');
    console.log(plainOrClass);
    console.log(options);
    console.log(super.transformToPlain(plainOrClass, options));
    return super.transformToPlain(plainOrClass, options);
  }
}
