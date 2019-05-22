import { Resolver } from '@nestjs/graphql';
import { OrgUnit } from './org-unit.entity';
import { createTreeResolver } from '../common/resolvers';
import { OrgUnitInput } from './org-unit.input';

const OrgUnitTreeResolver = createTreeResolver('orgUnit', OrgUnit, OrgUnitInput);

@Resolver(of => OrgUnit)
export class OrgUnitResolver extends OrgUnitTreeResolver {
  // @Query(() => [OrgUnit], { name: `orgUnitsTree` })
  // async findNode(
  //   @Args({ name: 'pagination', type: () => PaginationArgs, nullable: true })
  //   pagination?: PaginationArgs,
  // ): Promise<OrgUnit[]> {
  //   // TODO: implement pagination
  //   console.log('hopi');
  //   const repository = this.repository.manager.getTreeRepository(
  //     OrgUnit,
  //   ) as TreeRepository<OrgUnit>;
  //   const result = await repository.findTrees();
  //   console.log(result);
  //   return await repository.findTrees();
  // }
}
