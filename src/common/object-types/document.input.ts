import { Field, InputType } from 'type-graphql';
import { ResourceInput } from './resource.input';
import { IsOptional, IsDefined, IsString } from 'class-validator';
import { Document } from './document.type';

@InputType({ isAbstract: true })
export abstract class DocumentInput extends ResourceInput
  implements Partial<Document> {
  @Field({ nullable: true })
  @IsOptional()
  @IsDefined({ groups: ['insert'] })
  @IsString()
  title: string;

  @Field({ nullable: true })
  @IsOptional()
  description?: string;
}
