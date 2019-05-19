import { Query } from '@nestjs/graphql';
import { Resolver, Int, ClassType, Arg } from 'type-graphql';
import { Inject } from '@nestjs/common';

/**
 *
 * @param suffix
 * @param objectTypeCls
 *
 * const PersonBaseResolver = createBaseResolver("person", Person);
 * @Resolver(of => Person)
 * export class PersonResolver extends PersonBaseResolver {
 *   // ...
 * }
 *
 * See: https://typegraphql.ml/docs/inheritance.html
 */
export function createBaseResolver<T extends ClassType>(
  suffix: string,
  objectTypeCls: T,
) {
  // @Resolver({ isAbstract: true })
  @Resolver() // TODO: import from @nestjs/graphql or type-graphql?
  abstract class BaseResolver {
    protected items: T[] = [];
    constructor(private readonly repository: any) {}

    @Query(type => [objectTypeCls], { name: `getAll${suffix}` })
    async getAll(@Arg('first', type => Int) first: number): Promise<T[]> {
      // console.log(this.repository);
      console.log('Abstract getAll');
      return [];
      // return this.repository.findAll();
    }
  }

  return BaseResolver as any;
}
