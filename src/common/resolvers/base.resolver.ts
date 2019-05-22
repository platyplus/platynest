import { Injectable, UseGuards, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Query, Resolver, Args, Mutation } from '@nestjs/graphql';
import { Repository } from 'typeorm';
import { ClassType, ID } from 'type-graphql';
import { upperFirst } from 'lodash';
import { IsAuthenticated } from '../../auth/guards/authenticated';
import { PaginationArgs } from '../object-types/pagination.input';
import { BaseResolverOptions, pluralName } from '.';
// const pubSub = new PubSub(); // TODO: https://docs.nestjs.com/graphql/subscriptions

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
export function createBaseResolver<T extends ClassType, U>(
  name: string,
  objectTypeCls: T,
  inputTypeCls: U,
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
      const item = await this.repository.findOne(id);
      if (!item) {
        throw new NotFoundException(id);
      }
      return item;
    }

    @Query(() => [objectTypeCls], { name: `${pluralName(name, options)}` })
    async find(
      @Args({ name: 'pagination', type: () => PaginationArgs, nullable: true })
      pagination?: PaginationArgs,
    ): Promise<T[]> {
      // TODO: implement pagination
      return await this.repository.find();
    }

    @Mutation(() => objectTypeCls, { name: `upsert${upperFirst(name)}` })
    async save(
      @Args({ name: 'input', type: () => inputTypeCls })
      input,
    ) {
      // TODO: different validion when insert and when update
      let item = new objectTypeCls();
      if (input.id) {
        /* We need to get the initial data if it exists so it is correclty returned.
        The this.repository.save() does not retrieve the properties that
        have not been changed in the input */
        item =
          (await this.repository.findOne({ where: { id: input.id } })) || item;
      }
      Object.assign(item, input);
      item = await this.repository.save(item);
      // pubSub.publish('userAdded', { userAdded: user });
      return item;
    }

    // @Subscription(returns => User)
    // userAdded() {
    //   return pubSub.asyncIterator('userAdded');
    // }
  }
  return BaseResolver as any;
}
