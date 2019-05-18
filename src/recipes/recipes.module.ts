import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecipesResolver } from './recipes.resolver';
import { RecipesService } from './recipes.service';
import { Recipe } from './recipe.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Recipe])],
  providers: [RecipesResolver, RecipesService],
})
export class RecipesModule {}
