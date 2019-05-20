import { Field, InputType } from 'type-graphql';
import { ResourceInput } from './resource.input';

@InputType({ isAbstract: true })
export abstract class DocumentInput extends ResourceInput {
  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;
}
