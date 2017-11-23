import { User } from './user';

export interface UsersRepository {
  getAllUsers(): Promise<Array<User>>;

  deleteUser(userId: number): Promise<void>;

  initializeUsers(users: Array<User>): Promise<void>;
}
