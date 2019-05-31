import { AuthService } from './auth.service';
import { SignInDto } from './dto/signin.dto';
import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { IsAuthenticated } from './guards/authenticated';
import { Profile } from './decorators/profile.decorator';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => String, { name: `token` })
  @UseGuards(IsAuthenticated)
  async createToken(@Profile() user): Promise<any> {
    return await this.authService.sign(user);
  }

  @Mutation(() => String, { name: `signIn` })
  async signIn(@Args('credentials') credendials: SignInDto): Promise<string> {
    return await this.authService.signIn(credendials);
  }
}
