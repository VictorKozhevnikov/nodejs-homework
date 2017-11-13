import { Router, json } from 'express';

import * as passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as BearerStrategy } from 'passport-http-bearer';
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth';

import { Credentials } from './credentials';
import { authService } from './auth.service';
import { secret as googleData } from './google-client-secret';

// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.
passport
  .use(
    new GoogleStrategy(
      {
        clientID: googleData.web.client_id,
        clientSecret: googleData.web.client_secret,
        callbackURL: 'http://localhost:3000/api/auth/google/callback'
      },
      (accessToken, refreshToken, profile, done) => {
        console.log(profile);
        return done(null, profile);
      }
    )
  )
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
  .post('/', passport.authenticate('local'), (request, response) => {
    const principal = request.user;

    const tokenResponse = authService.issueToken(principal);
    return response
      .status(200)
      .json(tokenResponse)
      .end();
  })
  .get(
    '/google',
    passport.authenticate(
      'google',
      {
        scope: ['https://www.googleapis.com/auth/plus.me']
      }
      // https://www.googleapis.com/auth/plus.me
    )
  )
  .get(
    '/google/callback',
    passport.authenticate('google', { failureRedirect: '/', session: false }),
    (req, res) => {
      console.log('auth successful');
      res.redirect('/api/products');
    }
  );
