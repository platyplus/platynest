import {
  Injectable,
  NotFoundException,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserArgs } from './user.args';
import { Args, Resolver, Query, Mutation } from '@nestjs/graphql';
import { UserInput } from './user.input';
import { IsAuthenticated } from '../auth/guards/authenticated';
import { RoleInterceptor } from './role.interceptor';
import { Profile } from '../auth/decorators/profile.decorator';
// const pubSub = new PubSub(); // TODO: https://docs.nestjs.com/graphql/subscriptions

@Injectable()
@Resolver(of => User)
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findOneByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({ where: { email } });
  }

  @UseGuards(IsAuthenticated)
  @Query(type => User, { name: `user` })
  async findOneById(@Args('id') id: string): Promise<User> {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundException(id);
    }
    return user;
  }

  @UseGuards(IsAuthenticated)
  @UseInterceptors(RoleInterceptor) // TODO: split into RoleInterceptor and Owner/ContributorInterceptor?
  @Query(type => [User], { name: `users` })
  async find(@Profile() user: User, args: UserArgs): Promise<User[]> {
    console.log(user);
    return await this.userRepository.find(args);
  }

  @Mutation(returns => User, { name: 'upsertUser' })
  async save(@Args('input') userInput: UserInput): Promise<User> {
    let user = await this.userRepository.findOne({
      where: { email: userInput.email },
    });
    if (!user) {
      user = new User();
    }
    Object.assign(user, userInput); // TODO: deep clone
    user = await this.userRepository.save(user);
    // pubSub.publish('userAdded', { userAdded: user });
    return user;
  }

  // TODO: merge with the above? and allow only authenticated users to change password, authorizations...
  async saveProfile(user: User): Promise<User> {
    return await this.userRepository.save(user);
  }

  // @Subscription(returns => User)
  // userAdded() {
  //   return pubSub.asyncIterator('userAdded');
  // }
}
