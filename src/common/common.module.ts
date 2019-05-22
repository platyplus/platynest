import { Module } from '@nestjs/common';
import { JsonScalar } from './scalars/json.scalar';
import { PaginationArgs } from './object-types/pagination.input';
@Module({
  imports: [PaginationArgs],
  providers: [JsonScalar],
})
export class CommonModule {}
