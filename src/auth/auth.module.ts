import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { UserModule } from '../users/user.module';
import { AuthController } from './auth.controller';
import { UserService } from '../users/user.service';
import { UniqueUserConstraint } from './validators/unique-user.validator';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';
import { AuthResolver } from './auth.resolver';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => config.jwt,
      inject: [ConfigService],
    }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthResolver,
    JwtStrategy,
    UserService,
    UniqueUserConstraint,
  ],
})
export class AuthModule {}
