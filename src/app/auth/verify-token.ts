import { Request, Response, NextFunction } from 'express';
import * as passport from 'passport';

import { authService } from './auth.service';

export const verifyToken = passport.authenticate('bearer', { session: false });
