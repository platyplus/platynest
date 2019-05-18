// NestJS modules
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
// Common modules
import { CommonModule } from './common/common.module';
import { AuthModule } from './auth/auth.module';
// Entity modules
import { RecipesModule } from './recipes/recipes.module';
import { UsersModule } from './users/users.module';
// Entities
import { Recipe } from './recipes/recipe.entity';
import { User } from './users/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '',
      database: 'postgres',
      entities: [Recipe, User],
      synchronize: true,
      keepConnectionAlive: true,
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
  ],
})
export class ApplicationModule {}
