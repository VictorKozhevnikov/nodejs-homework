import { Request, Response, NextFunction } from 'express';
import * as parse from 'url-parse';

export function queryParse(request: Request, response: Response, next: NextFunction) {
    const parsedUrl = parse(request.url, true);
    request.query = parsedUrl.query;
    next();
}
