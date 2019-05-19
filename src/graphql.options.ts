import { ConfigService } from './config/config.service';
import { Inject } from '@nestjs/common';
import { GqlOptionsFactory, GqlModuleOptions } from '@nestjs/graphql';

export class GraphQLOptions implements GqlOptionsFactory {
  constructor(@Inject(ConfigService) private readonly config: ConfigService) {}

  createGqlOptions(): GqlModuleOptions {
    return {
      installSubscriptionHandlers: true,
      autoSchemaFile: 'schema.gql',
      context: ({ req }) => ({ req }),
      debug: this.config.development,
      playground: this.config.development,
    };
  }
}
