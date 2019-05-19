import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { CommonModule } from './common/common.module';
import { AuthModule } from './auth/auth.module';
import { RecipesModule } from './recipes/recipes.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from './config/config.module';
import { TypeOrmOptions } from './typeorm.options';
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigModule],
      useClass: TypeOrmOptions,
    }),
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      autoSchemaFile: 'schema.gql',
      context: ({ req }) => ({ req }),
      debug: true,
      playground: true,
    }),
    RecipesModule,
    CommonModule,
    AuthModule,
    UsersModule,
    ConfigModule,
  ],
})
export class ApplicationModule {}
