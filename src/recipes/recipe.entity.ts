import { Field, ObjectType } from 'type-graphql';
import { Column, Entity } from 'typeorm';
import { Document } from '../common/entities/document.entity';
import { JsonScalar } from '../common/scalars/json.scalar';

@ObjectType()
@Entity()
export class Recipe extends Document {
  @Field(type => [String])
  @Column({
    type: 'text',
    array: true,
  })
  ingredients: string[];

  @Field(type => JsonScalar)
  @Column({ type: 'jsonb', default: {} })
  jsonTest: any;
}
