import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { CommonModule } from './common/common.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './users/user.module';
import { ConfigModule } from './config/config.module';
import { TypeOrmOptions } from './typeorm.options';
import { GraphQLOptions } from './graphql.options';
import { OrgUnitModule } from './org-unit/org-unit.module';
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigModule],
      useClass: TypeOrmOptions,
    }),
    GraphQLModule.forRootAsync({
      inject: [ConfigModule],
      useClass: GraphQLOptions,
    }),
    CommonModule,
    AuthModule,
    UserModule,
    OrgUnitModule,
    ConfigModule,
  ],
})
export class ApplicationModule {}
