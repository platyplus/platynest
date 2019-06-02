import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { OrgUnit } from './org-unit.entity';
import { createTreeResolver } from '../common/resolvers';
import { OrgUnitInput } from './org-unit.input';
import { UpsertValidationPipe } from '../common/validators/upsert-validation-pipe';

const OrgUnitTreeResolver = createTreeResolver('orgUnit', OrgUnit);

@Resolver(of => OrgUnit)
export class OrgUnitResolver extends OrgUnitTreeResolver {
  /** Upsert method cannot be put in the base resolvers as
   * it is not possible to get the type of input from input: T
   * therefore the validation pipe doesn't work (metatype = object)
   * See the warning in https://docs.nestjs.com/pipes#built-in-pipes
   * @param input
   */
  @Mutation(() => OrgUnit, { name: `upsertOrgUnit` })
  async save(
    @Args({ name: 'input', type: () => OrgUnitInput }, UpsertValidationPipe)
    input: OrgUnitInput,
  ): Promise<OrgUnit> {
    // TODO: different validion when insert and when update
    let item = new OrgUnit();
    if (input.id) {
      /* We need to get the initial data if it exists so it is correclty returned.
      The this.repository.save() does not retrieve the properties that
      have not been changed in the input */
      item =
        (await this.repository.findOneOrFail({
          where: { id: input.id },
        })) || item;
    }
    Object.assign(item, input);
    item = await this.repository.save(item);
    // pubSub.publish('userAdded', { userAdded: user });
    return item;
  }
}
