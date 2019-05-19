import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { CommonModule } from './common/common.module';
import { AuthModule } from './auth/auth.module';
import { RecipesModule } from './recipes/recipes.module';
import { UserModule } from './users/user.module';
import { ConfigModule } from './config/config.module';
import { TypeOrmOptions } from './typeorm.options';
import { GraphQLOptions } from './graphql.options';
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
    RecipesModule,
    CommonModule,
    AuthModule,
    UserModule,
    ConfigModule,
  ],
})
export class ApplicationModule {}
