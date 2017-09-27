import { User } from './user';

export class UsersService {
    public constructor() { }

    public getUser(id: number): User {
        return {
            id: 0
        };
    }
}
