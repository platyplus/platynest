import { ObjectType, ID, Field } from 'type-graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Resource } from './resource.type';
import { Expose } from 'class-transformer';

@Entity({ orderBy: { title: 'ASC' } })
@ObjectType({ isAbstract: true })
export abstract class Document extends Resource {
  @Column({ length: 500 })
  @Field()
  @Expose()
  title: string;

  @Column('text')
  @Field({ nullable: true })
  @Expose()
  description?: string;
}
