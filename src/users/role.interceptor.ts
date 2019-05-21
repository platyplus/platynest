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
    // TODO: add user global roles: options = addRole(options, 'admin');
    return super.serialize(response, options);
  }
  transformToPlain(plainOrClass: any, options: ClassTransformOptions) {
    /** TODO:
     * Make this a bit more generic so it can be used for other entities (not only User)
     * More generic = for all the classes that actually have an owner
     * => extention of the generic BaseResolver to BaseManagedEntityResolver?
     * => or another solution?
     * TODO: then more extended roles such as contributor, reader etc
     * Based on rules... Big work!
     */
    const res = plainOrClass as User;
    if (this.user && res.email === this.user.email) {
      options = addRole(options, 'owner');
    }
    return super.transformToPlain(plainOrClass, options);
  }
}
