import { Resolver } from '@nestjs/graphql';
import { OrgUnit } from './org-unit.entity';
import { createBaseResolver } from '../common/resolvers/base.resolver';
import { OrgUnitInput } from '../org-unit/org-unit.input';
import { OrgUnitArgs } from '../org-unit/org-unit.args';

const OrgUnitBaseResolver = createBaseResolver('orgUnit', OrgUnit, OrgUnitInput);

@Resolver(() => OrgUnit)
export class OrgUnitService extends OrgUnitBaseResolver {
  // ...
}
