import { Repository } from 'typeorm';

import { User } from '../user';
import { UsersRepository } from '../users.repository';
import { UserEntity } from './user.entity';

export class UsersTypeormRepository implements UsersRepository {
  public constructor(private readonly repository: Repository<UserEntity>) {}

  public getAllUsers(): Promise<Array<User>> {
    return this.repository.find();
  }

  public async initializeUsers(users: Array<User>): Promise<void> {
    await this.repository.clear();
    await this.repository.insert(users);
  }
}
