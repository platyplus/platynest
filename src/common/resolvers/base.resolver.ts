import { Query, Resolver, Args, Mutation } from '@nestjs/graphql';
import { ClassType, ID } from 'type-graphql';
import { Injectable, UseGuards, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindConditions, FindManyOptions } from 'typeorm';
import { IsAuthenticated } from '../../auth/guards/authenticated';
import { upperFirst } from 'lodash';

export interface BaseResolverOptions {
  /**
   * Specifies the plural
   */
  plural?: string;
}

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
  const pluralName = () => (options && options.plural) || `${name}s`;

  @Injectable()
  @Resolver(() => objectTypeCls, { isAbstract: true })
  abstract class BaseResolver {
    constructor(
      @InjectRepository(objectTypeCls)
      private readonly repository: Repository<T>,
    ) {}

    @UseGuards(IsAuthenticated)
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

    @UseGuards(IsAuthenticated)
    @Query(() => [objectTypeCls], { name: `${pluralName()}` })
    async find(args: FindManyOptions<T> | FindConditions<T>): Promise<T[]> {
      // TODO: arguments are not working
      return await this.repository.find(args);
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
  }
  return BaseResolver as any;
}
