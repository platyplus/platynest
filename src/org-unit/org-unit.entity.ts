import { Field, ObjectType } from 'type-graphql';
import { Column, Entity, Tree, TreeParent, TreeChildren } from 'typeorm';
import { Document } from '../common/object-types/document.type';
import { Exclude, Expose } from 'class-transformer';

@Entity()
@Tree('closure-table')
@ObjectType()
@Exclude()
export class OrgUnit extends Document {
  @TreeChildren()
  @Field(type => [OrgUnit])
  @Expose()
  children: OrgUnit[];

  @TreeParent()
  @Field(type => OrgUnit)
  @Expose()
  parent: OrgUnit;
}
