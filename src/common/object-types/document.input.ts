import { Field, InputType } from 'type-graphql';
import { ResourceInput } from './resource.input';
import { IsOptional, IsNotEmpty } from 'class-validator';

@InputType({ isAbstract: true })
export abstract class DocumentInput extends ResourceInput {
  @Field()
  @IsNotEmpty()
  title: string;

  @Field({ nullable: true })
  @IsOptional()
  description?: string;
}
