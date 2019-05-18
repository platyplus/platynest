import { IsOptional, Length, MaxLength } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class UserInput {
  // TODO: standard UserInput class. Used to create/update any user - SignUp is a distinct process
  @Field()
  @MaxLength(30)
  title: string;

  @Field({ nullable: true })
  @IsOptional()
  @Length(30, 255)
  description?: string;

  @Field(type => [String])
  ingredients: string[];
}
