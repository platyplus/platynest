import { IsOptional, Length, IsEmail } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class UserInput {
  @Field()
  @IsEmail()
  email: string;

  @Field({ nullable: true })
  @IsOptional()
  @Length(2, 255)
  firstName?: string;

  @Field({ nullable: true })
  @IsOptional()
  @Length(2, 255)
  lastName?: string;
}
