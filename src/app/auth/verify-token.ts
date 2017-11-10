import { Request, Response, NextFunction } from 'express';

import { authService } from './auth.service';

export function verifyToken(request: Request, response: Response, next: NextFunction) {
  const authHeader: string = request.headers['authorization'] as string;
  if (!authHeader) {
    response.status(401).end('Unauthorized');
    return;
  }

  const token: string = authHeader.substring(authHeader.indexOf(' ') + 1);
  const tokenIsValid = authService.validateToken(token);
  if (tokenIsValid) {
    return next();
  } else {
    response.status(401).end('Unauthorized');
  }
}
