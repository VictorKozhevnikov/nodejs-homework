import * as jwt from 'jsonwebtoken';

import { Credentials } from './credentials';
import { TokenResponse } from './token-response';
import { Principal } from './principal';

const secret = 'secret';
const userName = 'user';
const allowedEmail = 'user@example.com';
const allowedPassword = 'password';

export class AuthService {
  public findPrincipal(credentials: Credentials): Principal | null {
    let principal: Principal | null = null;
    if (credentials.email === allowedEmail && credentials.password === allowedPassword) {
      principal = { email: allowedEmail, username: userName };
    }
    return principal;
  }

  public issueToken(principal: Principal): TokenResponse {
    const token = jwt.sign(principal, secret);
    return { user: principal, token };
  }

  public extractPrincipal(token: string): Principal | null {
    try {
      const principal: Principal = jwt.verify(token, secret) as Principal;
      return principal;
    } catch (err) {
      return null;
    }
  }
}

export const authService = new AuthService();
