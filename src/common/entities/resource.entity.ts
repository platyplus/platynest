import { ObjectType, ID, Field } from 'type-graphql';
import { Column, Entity, PrimaryGeneratedColumn, BeforeUpdate } from 'typeorm';

@ObjectType()
@Entity()
export abstract class Resource {
  @PrimaryGeneratedColumn('uuid')
  @Field(type => ID)
  id: string;

  @Field()
  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Field()
  @Column({ type: 'timestamptz', nullable: true })
  updatedAt: Date;

  @BeforeUpdate()
  updateDates() {
    this.updatedAt = new Date();
  }
}
