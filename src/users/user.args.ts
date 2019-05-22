import { ArgsType } from 'type-graphql';
import { PaginationArgs } from '../common/object-types/pagination.input';

@ArgsType()
export class UserArgs extends PaginationArgs {}
