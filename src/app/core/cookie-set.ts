import { Request, Response, NextFunction } from 'express';

export function cookieSet(request: Request, response: Response, next: NextFunction) {
  response.cookie('cookieName', 21, { maxAge: 900000, httpOnly: true });
  response.cookie('anotherName', 42, { maxAge: 900000, httpOnly: true });
  next();
}
