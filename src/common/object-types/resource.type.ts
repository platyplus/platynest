import { ObjectType, ID, Field } from 'type-graphql';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BeforeUpdate,
  BaseEntity,
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

  @BeforeUpdate()
  updateDates() {
    this.updatedAt = new Date();
  }
}
