import { IsUUID } from 'class-validator';
import { Field, InputType, ID } from 'type-graphql';

@InputType({ isAbstract: true })
export abstract class ResourceInput {
  @Field(type => ID, { nullable: true })
  @IsUUID()
  id: string;
}
