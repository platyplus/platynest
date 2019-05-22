import { UseInterceptors } from '@nestjs/common';
import { User } from './user.entity';
import { Resolver, Query, Args } from '@nestjs/graphql';
import { UserInput } from './user.input';
import { RoleInterceptor } from './role.interceptor';
import { createBaseResolver } from '../common/resolvers/base.resolver';
import { Profile } from '../auth/decorators/profile.decorator';
import { PaginationArgs } from '../common/object-types/pagination.input';

const UserBaseResolver = createBaseResolver('user', User, UserInput);

@Resolver(of => User)
export class UserResolver extends UserBaseResolver {
  @UseInterceptors(RoleInterceptor) // TODO: split into RoleInterceptor and Owner/ContributorInterceptor?
  @Query(() => [User], { name: `users` })
  async find(
    @Profile() user: User,
    @Args({ name: 'pagination', type: () => PaginationArgs, nullable: true })
    pagination?: PaginationArgs,
  ): Promise<User[]> {
    return super.find(pagination);
  }
}
