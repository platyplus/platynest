import { Field, ObjectType } from 'type-graphql';
import { Column, Entity, BeforeUpdate, BeforeInsert } from 'typeorm';
import { Resource } from '../common/entities/resource.entity';
import { Exclude } from 'class-transformer';
import { genSalt, hash } from 'bcryptjs';

@ObjectType()
@Entity()
export class User extends Resource {
  @Field()
  @Column({ unique: true })
  email: string;

  @Exclude()
  password: string;

  @Exclude()
  @Column({ nullable: true })
  hashedPassword: string;
  /*
  @Field()
  @Column()
  firstName: string;

  @Field()
  @Column()
  lastName: string;
*/
  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password) {
      const salt = await genSalt(10);
      this.hashedPassword = await hash(this.password, salt);
    }
  }
}
