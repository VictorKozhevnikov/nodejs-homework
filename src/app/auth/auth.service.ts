import { Credentials } from './credentials';
import { TokenResponse } from './token-response';

const userName = 'user';
const allowedEmail = 'user@example.com';
const allowedPassword = 'password';
const allowedToken = '00e52225e0634e8aa10f7c45dbf6ea6f';

export class AuthService {
  public issueToken(credentials: Credentials): TokenResponse | null {
    if (credentials.email === allowedEmail && credentials.password === allowedPassword) {
      return {
        user: { email: allowedEmail, username: userName },
        token: allowedToken
      };
    } else {
      return null;
    }
  }

  public validateToken(token: string): boolean {
    return token === allowedToken;
  }
}

export const authService = new AuthService();
