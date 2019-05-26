import { Controller, Get, UseGuards, Post, Body, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { IsAuthenticated } from './guards/authenticated';
import { SignInDto } from './dto/signin.dto';
import { SignUpDto } from './dto/signup.dto';
import { Profile } from './decorators/profile.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('token')
  @UseGuards(IsAuthenticated)
  async createToken(@Profile() user): Promise<any> {
    return this.authService.sign(user);
  }

  @Get('data')
  @UseGuards(IsAuthenticated)
  async findAll(@Profile() user) {
    return [];
  }

  @Post('signin')
  async signin(@Body() credendials: SignInDto): Promise<any> {
    return await this.authService.signIn(credendials);
  }

  @Post('signup')
  async signup(@Body() signUpDto: SignUpDto): Promise<any> {
    return await this.authService.signUp(signUpDto);
  }
}
