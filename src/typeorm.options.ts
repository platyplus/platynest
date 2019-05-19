import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from './config/config.service';
import { Inject } from '@nestjs/common';

export class TypeOrmOptions implements TypeOrmOptionsFactory {
  constructor(@Inject(ConfigService) private readonly config: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return this.config.database;
  }
}
