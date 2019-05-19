import * as dotenv from 'dotenv';
import * as Joi from 'joi';
import * as fs from 'fs';
import { Recipe } from '../recipes/recipe.entity';
import { User } from '../users/user.entity';

/**
 * Declare into ENTITIES the modules need to be taken into account by TypeORM
 */
const ENTITIES = [Recipe, User];

export interface EnvConfig {
  [key: string]: string;
}

export class ConfigService {
  private readonly envConfig: EnvConfig;

  constructor(filePath: string) {
    const config = dotenv.parse(fs.readFileSync(filePath));
    this.envConfig = this.validateInput(config);
  }

  /**
   * Ensures all needed variables are set, and returns the validated JavaScript object
   * including the applied default values.
   */
  // TODO: replace Joi by the other validator?
  private validateInput(envConfig: EnvConfig): EnvConfig {
    const envVarsSchema: Joi.ObjectSchema = Joi.object({
      NODE_ENV: Joi.string()
        .valid(['development', 'production', 'test', 'provision'])
        .default('development'),
      PORT: Joi.number()
        .port()
        .default(3000),
      API_AUTH_ENABLED: Joi.boolean().required(),
      SECRET: Joi.string(),
      DB_TYPE: Joi.string()
        .valid([
          'postgres',
          'mysql',
          'mariadb',
          'cockroachdb',
          'oracle',
          'mongodb',
        ])
        .default('postgres'),
      DB_HOST: Joi.alternatives().try(
        Joi.string().hostname(),
        Joi.string().ip(),
      ),
      DB_PORT: Joi.number()
        .port()
        .default(5432),
      DB_NAME: Joi.string(),
      DB_USER: Joi.string(),
      DB_PASSWORD: Joi.string()
        .allow('')
        .default(''),
    });

    const { error, value: validatedEnvConfig } = Joi.validate(
      envConfig,
      envVarsSchema,
    );
    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }
    return validatedEnvConfig;
  }

  get isApiAuthEnabled(): boolean {
    return Boolean(this.envConfig.API_AUTH_ENABLED);
  }

  get port(): number {
    return Number(this.envConfig.PORT);
  }

  get database() {
    return {
      type: this.envConfig.DB_TYPE as 'postgres',
      host: this.envConfig.DB_HOST,
      port: Number(this.envConfig.DB_PORT),
      username: this.envConfig.DB_USER,
      password: this.envConfig.DB_PASSWORD,
      database: this.envConfig.DB_NAME,
      entities: ENTITIES,
      synchronize: true,
      keepConnectionAlive: true,
    };
  }

  get secret(): string {
    return this.envConfig.SECRET;
  }

  get jwt() {
    return {
      secretOrPrivateKey: this.secret,
      signOptions: {
        expiresIn: 3600,
      },
    };
  }

  get development(): boolean {
    return this.envConfig.NODE_ENV === 'development';
  }
}
