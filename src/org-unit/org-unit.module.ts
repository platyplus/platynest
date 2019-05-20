import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrgUnit } from './org-unit.entity';
import { OrgUnitService } from './org-unit.service';

@Module({
  imports: [TypeOrmModule.forFeature([OrgUnit])],
  providers: [OrgUnitService],
})
export class OrgUnitModule {}
