import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/user.service';
import { SignInDto } from './dto/signin.dto';
import { SignUpDto } from './dto/signup.dto';
import { User } from '../users/user.entity';
import { plainToClass, classToPlain } from 'class-transformer';
import { compare } from 'bcryptjs';
import { InvalidCredentialsException } from './exceptions/invalid-credentials.exception';
import { JwtPayload } from './interfaces/jwt-payload.interface';
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  sign(user: User) {
    const payload = classToPlain(user) as JwtPayload;
    return this.jwtService.sign(payload);
  }

  async validateUser(payload: JwtPayload): Promise<User> {
    const user = await this.usersService.findOneByEmail(payload.email);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }

  async signIn(payload: SignInDto): Promise<string> {
    const user = await this.usersService.findOneByEmail(payload.email);
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
    await this.usersService.saveUser(user);
    return this.sign(user);
  }
}
