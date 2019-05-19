import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserArgs } from './user.args';
import { Args, Resolver, Query } from '@nestjs/graphql';
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

  @Query(type => User, { name: `user` })
  async findOneById(@Args('id') id: string): Promise<User> {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundException(id);
    }
    return user;
  }

  @Query(type => [User], { name: `users` })
  async find(args: UserArgs): Promise<User[]> {
    return await this.userRepository.find(args);
  }

  async saveUser(user: User): Promise<User> {
    return await this.userRepository.save(user);
  }
}
