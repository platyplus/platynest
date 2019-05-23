import { Field, ObjectType, Int } from 'type-graphql';
import {
  Entity,
  Tree,
  TreeParent,
  TreeChildren,
  TreeLevelColumn,
} from 'typeorm';
import { Document } from '../common/object-types/document.type';
import { Exclude, Expose } from 'class-transformer';

@Entity()
@Tree('closure-table')
@ObjectType()
@Exclude()
export class OrgUnit extends Document {
  @TreeChildren({ cascade: true })
  @Field(type => [OrgUnit], { nullable: true })
  @Expose()
  children: OrgUnit[];

  @TreeParent()
  @Field(type => OrgUnit, { nullable: true })
  @Expose()
  parent: OrgUnit;

  @TreeLevelColumn()
  @Field(type => Int)
  @Expose()
  level: number;
}
