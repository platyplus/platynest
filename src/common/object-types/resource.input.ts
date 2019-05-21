import { IsUUID, IsOptional } from 'class-validator';
import { Field, InputType, ID } from 'type-graphql';

@InputType({ isAbstract: true })
export abstract class ResourceInput {
  @Field(type => ID, { nullable: true })
  @IsOptional()
  @IsUUID()
  id: string;
}
