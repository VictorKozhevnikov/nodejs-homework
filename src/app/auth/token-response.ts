export interface TokenResponse {
  user: {
    email: string;
    username: string;
  };
  token: string;
}
