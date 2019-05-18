import { Controller, Get, UseGuards, Post, Body, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { IsAuthenticated } from './guards/authenticated';
import { SignInDto } from './dto/signin.dto';
import { SignUpDto } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('token')
  @UseGuards(IsAuthenticated)
  async createToken(@Req() req): Promise<any> {
    return this.authService.sign(req.user);
  }

  @Get('data')
  @UseGuards(IsAuthenticated)
  findAll(@Req() req) {
    console.log(req.user);
  }

  @Post('signin')
  signin(@Body() SigninDto: SignInDto): Promise<any> {
    return this.authService.signIn(SigninDto);
  }

  @Post('signup')
  signup(@Body() signUpDto: SignUpDto): Promise<any> {
    return this.authService.signUp(signUpDto);
  }
}
