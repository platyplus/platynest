import { InputType, Field } from 'type-graphql';
import { DocumentInput } from '../common/object-types/document.input';
import { OrgUnit } from './org-unit.entity';
import { IsOptional } from 'class-validator';
import { DeepPartial } from 'typeorm';

@InputType()
export class OrgUnitInput extends DocumentInput
  implements DeepPartial<OrgUnit> {
  @Field(type => OrgUnitInput, { nullable: true })
  @IsOptional()
  parent: OrgUnitInput;
}
