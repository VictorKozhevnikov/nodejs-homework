import { Connection, Model, Document } from 'mongoose';

import { User } from '../user';
import { UsersRepository } from '../users.repository';
import { UserTypegoose } from './user.typegoose';

export class UsersMongoRepository implements UsersRepository {
  private readonly UserModel: Model<UserTypegoose & Document>;

  public constructor(connection: Connection) {
    this.UserModel = new UserTypegoose().getModelForClass(UserTypegoose, {
      existingConnection: connection
    });
  }

  public getAllUsers(): Promise<Array<User>> {
    return this.UserModel.find().exec();
  }

  public async initializeUsers(users: Array<User>): Promise<void> {
    await this.UserModel.remove({}).exec();
    await this.UserModel.insertMany(users);
  }
}
