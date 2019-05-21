import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrgUnit } from './org-unit.entity';
import { OrgUnitResolver } from './org-unit.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([OrgUnit])],
  providers: [OrgUnitResolver],
})
export class OrgUnitModule {}
