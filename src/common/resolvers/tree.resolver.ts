import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { Query, Args } from '@nestjs/graphql';
import { EntityManager, TreeRepository, Repository } from 'typeorm';
import { ClassType, ID } from 'type-graphql';
import { BaseResolverOptions, createBaseResolver } from '.';
export function createTreeResolver<T extends ClassType>(
  name: string,
  objectTypeCls: T,
  options?: BaseResolverOptions,
) {
  const BaseResolver = createBaseResolver(name, objectTypeCls, options);

  @Injectable()
  abstract class TreeResolver extends BaseResolver {
    private treeRepository: TreeRepository<T>;
    constructor(
      @InjectEntityManager()
      private readonly manager: EntityManager,
      @InjectRepository(objectTypeCls)
      private readonly repository: Repository<T>,
    ) {
      super(repository);
      this.treeRepository = manager.getTreeRepository(objectTypeCls);
    }

    /**
     * Returns all trees in the database with all their children, children of children, etc.
     */
    @Query(() => [objectTypeCls], { name: `${name}Trees` })
    async findTree(): Promise<T[]> {
      return await this.treeRepository.findTrees();
    }

    /**
     * Roots are entities that have no ancestors. Finds them all. Does not load children leafs.
     */
    @Query(() => [objectTypeCls], { name: `${name}Roots` })
    async findRoots(): Promise<T[]> {
      return await this.treeRepository.findRoots();
    }

    /**
     * Gets all children (descendants) of the given entity id. Returns them all in a flat array.
     */
    @Query(() => [objectTypeCls], { name: `${name}Descendants` })
    async findDescendants(
      @Args({ name: 'id', type: () => ID }) id: string,
    ): Promise<T[]> {
      const parent = await this.treeRepository.findOneOrFail(id);
      // TODO: create generic custom repository with .findOne + exception if not found
      // TODO: or catch the exception?
      // See: https://typeorm.io/#/custom-repository
      return await this.treeRepository.findDescendants(parent);
    }

    /**
     * Gets all children (descendants) of the given entity. Returns them in a tree - nested into each other.
     */
    @Query(() => objectTypeCls, { name: `${name}DescendantsTree` })
    async findDescendantsTree(
      @Args({ name: 'id', type: () => ID }) id: string,
    ): Promise<T> {
      const parent = await this.treeRepository.findOneOrFail(id);
      return await this.treeRepository.findDescendantsTree(parent);
    }

    /**
     * Gets all parent (ancestors) of the given entity. Returns them all in a flat array.
     */
    @Query(() => [objectTypeCls], { name: `${name}Ancestors` })
    async findAncestors(
      @Args({ name: 'id', type: () => ID }) id: string,
    ): Promise<T[]> {
      const child = await this.treeRepository.findOneOrFail(id);
      return await this.treeRepository.findAncestors(child);
    }

    /**
     * Returns all trees in the database with all their children, children of children, etc.
     */
    @Query(() => objectTypeCls, { name: `${name}AncestorsTree` })
    async AncestorsTree(
      @Args({ name: 'id', type: () => ID }) id: string,
    ): Promise<T> {
      const child = await this.treeRepository.findOneOrFail(id);
      return await this.treeRepository.findAncestorsTree(child);
    }

    // TODO: counts, createDescendantsQueryBuilder, createAncestorsQueryBuilder
    // See: https://typeorm.io/#/tree-entities/working-with-tree-entities
  }
  return TreeResolver as any;
}
