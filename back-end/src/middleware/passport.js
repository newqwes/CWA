import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
import dotenv from 'dotenv';

import UserDto from '../dto/userDto';
import { generateTokens } from '../utils/token';
import createResponse from '../utils/createResponse';
import { createUserDataByGoogle } from '../utils/user';

import userService from '../services/userService';
import mailService from '../services/mailService';
import tokenService from '../services/tokenService';

dotenv.config();

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.ACCESS_TOKEN_SECRET,
};

const googleOptions = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL,
  passReqToCallback: true,
};

const passportJWTAndGoogle = passport => {
  passport.use(
    new JwtStrategy(options, async ({ id }, done) => {
      try {
        const user = await userService.findByKey(id, 'id');

        user ? done(null, user) : done(null, false);
      } catch (error) {
        return createResponse(500, 'Server Error', error);
      }
    }),
  );

  passport.use(
    new GoogleStrategy(
      googleOptions,
      async (request, accessToken, refreshToken, { email, displayName }, done) => {
        try {
          const { defaults, randomPassword } = createUserDataByGoogle({ email, displayName });

          const { user, created } = await userService.findOrCreateByEmail(email, defaults);

          const userDto = new UserDto(user);
          const userData = { ...userDto };

          const tokens = generateTokens(userData);

          await tokenService.saveToken({
            userId: userData.id,
            refreshToken: tokens.refreshToken,
          });

          if (created) {
            await mailService.sendPasswordMail(email, randomPassword);
          }

          user ? done(null, user) : done(null, false);
        } catch (error) {
          return createResponse(500, 'Server Error', error);
        }
      },
    ),
  );

  passport.serializeUser((user, done) => done(null, user.email));

  passport.deserializeUser(async (email, done) => {
    const user = await userService.findByKey(email, 'email').catch(err => {
      console.log('Error deserializing', err);
      return done(err, null);
    });

    if (user) {
      const userDto = new UserDto(user);
      const userData = { ...userDto };

      return done(null, userData);
    }

    return done(null, false);
  });
};

export default passportJWTAndGoogle;
