import { Injectable, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Query, Resolver, Args } from '@nestjs/graphql';
import { Repository } from 'typeorm';
import { ClassType, ID } from 'type-graphql';
import { upperFirst } from 'lodash';
import { IsAuthenticated } from '../../auth/guards/authenticated';
import { PaginationArgs } from '../object-types/pagination.input';
import { BaseResolverOptions, pluralName } from '.';

// const pubSub = new PubSub(); // TODO: https://docs.nestjs.com/graphql/subscriptions
/**
 *
 * @param name
 * @param objectTypeCls
 *
 * const PersonBaseResolver = createBaseResolver("person", Person, PersonInput);
 * @Resolver(of => Person)
 * export class PersonResolver extends PersonBaseResolver {
 *   // ...
 * }
 *
 * See: https://typegraphql.ml/docs/inheritance.html
 */
export function createBaseResolver<T extends ClassType>(
  name: string,
  objectTypeCls: T,
  options?: BaseResolverOptions,
) {
  @Injectable()
  @Resolver(() => objectTypeCls, { isAbstract: true })
  @UseGuards(IsAuthenticated)
  abstract class BaseResolver {
    constructor(
      @InjectRepository(objectTypeCls)
      private readonly repository: Repository<T>,
    ) {}

    @Query(() => objectTypeCls, { name: `${name}` })
    async findOneById(
      @Args({ name: 'id', type: () => ID }) id: string,
    ): Promise<T> {
      return await this.repository.findOneOrFail(id);
    }

    @Query(() => [objectTypeCls], { name: `${pluralName(name, options)}` })
    async find(
      // @Profile() user: User,
      @Args({ name: 'pagination', type: () => PaginationArgs, nullable: true })
      pagination?: PaginationArgs,
    ): Promise<T[]> {
      // TODO: implement pagination
      return await this.repository.find(pagination);
    }

    // @Subscription(returns => User)
    // userAdded() {
    //   return pubSub.asyncIterator('userAdded');
    // }
  }
  return BaseResolver as any;
}
