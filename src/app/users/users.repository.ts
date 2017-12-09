import { User } from './user';

export interface UsersRepository {
  getAllUsers(): Promise<Array<User>>;

  initializeUsers(users: Array<User>): Promise<void>;
}
