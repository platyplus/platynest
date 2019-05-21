import { UseInterceptors } from '@nestjs/common';
import { User } from './user.entity';
import { Resolver, Query } from '@nestjs/graphql';
import { UserInput } from './user.input';
import { RoleInterceptor } from './role.interceptor';
import { createBaseResolver } from '../common/resolvers/base.resolver';
import { Profile } from '../auth/decorators/profile.decorator';
import { FindConditions, FindManyOptions } from 'typeorm';

const UserBaseResolver = createBaseResolver('user', User, UserInput);

@Resolver(of => User)
export class UserResolver extends UserBaseResolver {
  @UseInterceptors(RoleInterceptor) // TODO: split into RoleInterceptor and Owner/ContributorInterceptor?
  @Query(() => [User], { name: `users` })
  async find(
    @Profile() user: User,
    args: FindManyOptions<User> | FindConditions<User>,
  ): Promise<User[]> {
    return super.find(args);
  }
}
