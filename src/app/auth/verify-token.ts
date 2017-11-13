import { Request, Response, NextFunction } from 'express';
import * as passport from 'passport';

import { authService } from './auth.service';

// export const verifyToken = passport.authenticate('google');
export const verifyToken = (req, res, next) => {
  console.log('check authentication');
  if (req.isAuthenticated) {
    return next();
  } else {
    res.redirect('/api/auth/google');
  }
};
