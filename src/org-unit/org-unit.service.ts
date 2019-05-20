import { Injectable, NotFoundException, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Args, Resolver, Query, Mutation } from '@nestjs/graphql';
import { IsAuthenticated } from '../auth/guards/authenticated';
import { Profile } from '../auth/decorators/profile.decorator';
import { OrgUnit } from './org-unit.entity';
import { OrgUnitArgs } from './org-unit.args';
import { OrgUnitInput } from './org-unit.input';
// const pubSub = new PubSub(); // TODO: https://docs.nestjs.com/graphql/subscriptions

@Injectable()
@Resolver(of => OrgUnit)
export class OrgUnitService {
  constructor(
    @InjectRepository(OrgUnit)
    private readonly repository: Repository<OrgUnit>,
  ) {}

  @UseGuards(IsAuthenticated)
  @Query(type => OrgUnit, { name: `orgUnit` })
  async findOneById(@Args('id') id: string): Promise<OrgUnit> {
    const item = await this.repository.findOne(id);
    if (!item) {
      throw new NotFoundException(id);
    }
    return item;
  }

  @UseGuards(IsAuthenticated)
  @Query(type => [OrgUnit], { name: `orgUnits` })
  async find(args: OrgUnitArgs): Promise<OrgUnit[]> {
    return await this.repository.find(args);
  }

  @Mutation(returns => OrgUnit, { name: 'upsertOrgUnit' })
  async save(@Args('input') itemInput: OrgUnitInput): Promise<OrgUnit> {
    let item: OrgUnit;
    if (itemInput.id) {
      item = await this.repository.findOne(itemInput.id);
      if (!item) {
        item = new OrgUnit();
      }
    } else {
      item = new OrgUnit();
    }
    Object.assign(item, itemInput); // TODO: deep clone
    item = await this.repository.save(item);
    // pubSub.publish('userAdded', { userAdded: user });
    return item;
  }
}
