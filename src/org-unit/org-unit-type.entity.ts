import { ObjectType } from 'type-graphql';
import { Entity } from 'typeorm';
import { Document } from '../common/object-types/document.type';
import { Exclude } from 'class-transformer';

@Entity()
@ObjectType()
@Exclude()
export class OrgUnitType extends Document {}
