import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

/**
 * User service, for internal use only.
 * TODO: move into the auth module??
 */
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  async findOneByEmail(email: string): Promise<User> {
    return await this.repository.findOne({ where: { email } });
  }

  // TODO: allow only authenticated users to change password, authorizations...
  async saveProfile(user: User): Promise<User> {
    return await this.repository.save(user);
  }

  // @Subscription(returns => User)
  // userAdded() {
  //   return pubSub.asyncIterator('userAdded');
  // }
}
