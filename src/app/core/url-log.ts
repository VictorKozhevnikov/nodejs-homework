import { Request, Response, NextFunction } from 'express';

export function urlLog(request: Request, response: Response, next: NextFunction) {
  console.log('-----');
  console.log(`${request.method} ${request.url}`);
  next();
}
