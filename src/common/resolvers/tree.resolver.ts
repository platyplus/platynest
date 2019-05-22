import { Injectable, UseGuards } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Resolver } from '@nestjs/graphql';
import { EntityManager } from 'typeorm';
import { ClassType } from 'type-graphql';
import { IsAuthenticated } from '../../auth/guards/authenticated';
import { BaseResolverOptions, createBaseResolver } from '.';

export function createTreeResolver<T extends ClassType, U>(
  name: string,
  objectTypeCls: T,
  inputTypeCls: U,
  options?: BaseResolverOptions,
) {
  const BaseResolver = createBaseResolver(
    name,
    objectTypeCls,
    inputTypeCls,
    options,
  );

  @Injectable()
  @Resolver(() => objectTypeCls, { isAbstract: true })
  @UseGuards(IsAuthenticated)
  abstract class TreeResolver extends BaseResolver {
    constructor(
      @InjectEntityManager()
      private readonly manager: EntityManager,
    ) {
      super();
    }
  }
  return TreeResolver as any;
}
