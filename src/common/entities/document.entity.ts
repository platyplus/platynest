import { ObjectType, ID, Field } from 'type-graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Resource } from './resource.entity';

@ObjectType()
@Entity()
export abstract class Document extends Resource {
  @PrimaryGeneratedColumn('uuid')
  @Field(type => ID)
  id: string;

  @Column({ length: 500 })
  @Field()
  title: string;

  @Field({ nullable: true })
  @Column('text')
  description?: string;
}
