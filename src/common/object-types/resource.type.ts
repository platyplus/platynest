import { ObjectType, ID, Field, Int } from 'type-graphql';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  VersionColumn,
} from 'typeorm';
import { Expose } from 'class-transformer';

@Entity()
@ObjectType({ isAbstract: true })
export abstract class Resource extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field(type => ID)
  @Expose()
  id: string;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  @Field()
  @Expose()
  createdAt: Date;

  @Column({ type: 'timestamptz', nullable: true })
  @Field()
  @Expose()
  updatedAt: Date;

  @VersionColumn()
  @Field(type => Int)
  @Expose()
  version: number;
}
