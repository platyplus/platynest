import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class SignInDto {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
