import { Router, json } from 'express';

import * as passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as BearerStrategy } from 'passport-http-bearer';

import { Credentials } from './credentials';
import { authService } from './auth.service';

passport
  .use(
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password'
      },
      (username, password, done) => {
        const credentials: Credentials = {
          email: username,
          password
        };
        const principal = authService.findPrincipal(credentials);
        return done(null, principal);
      }
    )
  )
  .use(
    new BearerStrategy((token, done) => {
      const principal = authService.extractPrincipal(token);
      return done(null, principal);
    })
  );

export const authRouter = Router()
  .use(json())
  .post('/', passport.authenticate('local', { session: false }), (request, response) => {
    const principal = request.user;

    const tokenResponse = authService.issueToken(principal);
    return response
      .status(200)
      .json(tokenResponse)
      .end();
  });
