import { Request, Response, NextFunction } from 'express';

export function cookieLog(request: Request, response: Response, next: NextFunction) {
    console.log(request.cookies);
    next();
}
