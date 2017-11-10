import * as jwt from 'jsonwebtoken';

import { Credentials } from './credentials';
import { TokenResponse } from './token-response';

const secret = 'secret';
const userName = 'user';
const allowedEmail = 'user@example.com';
const allowedPassword = 'password';
// const allowedToken = '00e52225e0634e8aa10f7c45dbf6ea6f';

export class AuthService {
  public issueToken(credentials: Credentials): TokenResponse | null {
    if (credentials.email === allowedEmail && credentials.password === allowedPassword) {
      const user = { email: allowedEmail, username: userName };
      const token = jwt.sign(user, secret);
      return { user, token };
    } else {
      return null;
    }
  }

  public validateToken(token: string): boolean {
    try {
      jwt.verify(token, secret);
      return true;
    } catch (err) {
      return false;
    }
  }
}

export const authService = new AuthService();
