import { ArgsType } from 'type-graphql';
import { PaginationArgs } from '../common/args/pagination.args';

@ArgsType()
export class UserArgs extends PaginationArgs {}
