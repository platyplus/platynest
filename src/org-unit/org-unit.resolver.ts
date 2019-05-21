import { Resolver } from '@nestjs/graphql';
import { OrgUnit } from './org-unit.entity';
import { createBaseResolver } from '../common/resolvers/base.resolver';
import { OrgUnitInput } from './org-unit.input';

const OrgUnitBaseResolver = createBaseResolver('orgUnit', OrgUnit, OrgUnitInput);

@Resolver(of => OrgUnit)
export class OrgUnitResolver extends OrgUnitBaseResolver {}
