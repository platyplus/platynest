import { Module } from '@nestjs/common';
import { JsonScalar } from './scalars/json.scalar';
@Module({
  providers: [JsonScalar],
})
export class CommonModule {}
