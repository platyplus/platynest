import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/user.service';
import { SignInDto } from './dto/signin.dto';
import { SignUpDto } from './dto/signup.dto';
import { User } from '../users/user.entity';
import { plainToClass, classToPlain, classToClass } from 'class-transformer';
import { compare } from 'bcryptjs';
import { InvalidCredentialsException } from './exceptions/invalid-credentials.exception';
import { JwtPayload } from './interfaces/jwt-payload.interface';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  sign(user: User) {
    const payload = classToPlain(user, { groups: ['service'] }) as JwtPayload;
    return this.jwtService.sign(payload);
  }

  async validateUser(payload: JwtPayload): Promise<User> {
    const user = await this.userService.findOneByEmail(payload.email);
    if (!user) {
      throw new UnauthorizedException();
    }
    return classToClass(user, { groups: ['service'] }); // filters only the properties services could see
  }

  async signIn(payload: SignInDto): Promise<string> {
    const user = await this.userService.findOneByEmail(payload.email);
    if (!user) {
      throw new InvalidCredentialsException();
    }
    const passwordMatches = await compare(payload.password, user.hashedPassword);
    if (!passwordMatches) {
      throw new InvalidCredentialsException();
    }
    return this.sign(user);
  }

  async signUp(payload: SignUpDto): Promise<string> {
    const user = plainToClass(User, payload);
    await this.userService.saveProfile(user);
    return this.sign(user);
  }
}
