import { User } from './user';
import { users as initialUsers } from './users-initial-collection';
import { UsersRepository } from './users.repository';

export class UserService {
  public constructor(private readonly repository: UsersRepository) {}

  public getAllUsers(): Promise<Array<User>> {
    return this.repository.getAllUsers();
  }

  public initializeUsers(): Promise<void> {
    return this.repository.initializeUsers(initialUsers);
  }
}
