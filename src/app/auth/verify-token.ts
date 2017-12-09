import { Request, Response, NextFunction } from 'express';

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  console.log('check authentication');
  if (req.isAuthenticated) {
    return next();
  } else {
    res.redirect('/api/auth/google');
  }
};
