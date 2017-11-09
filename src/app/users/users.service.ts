import Lowdb = require('lowdb');
import { User } from './user';
import { users as initialUsers } from './users-initial-collection';

export class UserService {
  public constructor(private readonly db: Lowdb) {}

  public getAllUsers(): Array<User> {
    return this.db.get('users').value();
  }

  public initializeUsers(): void {
    this.db.set('users', initialUsers).write();
  }
}
