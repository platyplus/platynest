import { IsUUID, IsOptional } from 'class-validator';
import { Field, InputType, ID } from 'type-graphql';
import { Resource } from './resource.type';

@InputType({ isAbstract: true })
export abstract class ResourceInput implements Partial<Resource> {
  @Field(type => ID, { nullable: true })
  @IsOptional()
  @IsUUID()
  id: string;
}
