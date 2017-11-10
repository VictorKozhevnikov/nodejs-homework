import { Request, Response, NextFunction } from 'express';

export function queryLog(request: Request, response: Response, next: NextFunction) {
    console.log(request.query);
    next();
}
