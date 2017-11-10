import * as cookie from 'cookie';
import { Request, Response, NextFunction } from 'express';

export function cookieParse(request: Request, response: Response, next: NextFunction) {
  const rawCookie = request.headers.cookie as string;
  if (rawCookie) {
    request.cookies = cookie.parse(rawCookie);
  }
  next();
}
