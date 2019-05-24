import { Field, ObjectType } from 'type-graphql';
import { Column, Entity, BeforeUpdate, BeforeInsert } from 'typeorm';
import { Resource } from '../common/object-types/resource.type';
import { Exclude, Expose } from 'class-transformer';
import { genSalt, hash } from 'bcryptjs';

@ObjectType()
@Entity()
@Exclude()
export class User extends Resource {
  @Field()
  @Column({ unique: true })
  @Expose() // TODO: do not send the entire user if not authorized => filter typeorm.find() level
  /** TODO:
   * add a 'where' typeorm filter based on the class-validator decorators of the entity
   * Ideally: surcharger la classe Repository de TypeOrm
   */
  email: string;

  @Expose({ groups: ['service'] })
  password: string;

  @Column({ nullable: true })
  hashedPassword: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  @Expose({ groups: ['service', 'admin', 'owner'] })
  firstName: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  @Expose({ groups: ['service', 'admin', 'owner'] })
  lastName: string;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password) {
      const salt = await genSalt(10);
      this.hashedPassword = await hash(this.password, salt);
    }
  }
}
