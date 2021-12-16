import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
import dotenv from 'dotenv';

import UserDto from '../dto/userDto';
import { generateTokens } from '../utils/token';
import createResponse from '../utils/createResponse';
import { createUserDataByGoogle } from '../utils/user';

import UserService from '../services/userService';
import MailService from '../services/mailService';
import TokenService from '../services/tokenService';

dotenv.config();

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.ACCESS_TOKEN_SECRET,
};

const mwPassport = passport => {
  passport.use(
    new JwtStrategy(options, async ({ id }, done) => {
      try {
        const user = await UserService.findByKey(id, 'id');

        user ? done(null, user) : done(null, false);
      } catch (error) {
        return createResponse(500, 'Server Error', error);
      }
    }),
  );
};

const googleOptions = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL,
  passReqToCallback: true,
};

export const googlePassport = passport => {
  passport.use(
    new GoogleStrategy(
      googleOptions,
      async (request, accessToken, refreshToken, { email, displayName }, done) => {
        try {
          const { defaults, randomPassword } = createUserDataByGoogle({ email, displayName });

          const { user, created } = await UserService.findOrCreateByEmail(email, defaults);

          const userDto = new UserDto(user);
          const userData = { ...userDto };

          const tokens = generateTokens(userData);

          await TokenService.saveToken({
            userId: userData.id,
            refreshToken: tokens.refreshToken,
          });

          if (created) {
            await MailService.sendPasswordMail(email, randomPassword);
          }

          return done(null, user || false);
        } catch (error) {
          return createResponse(500, 'Server Error', error);
        }
      },
    ),
  );

  passport.serializeUser((user, done) => {
    done(null, user.email);
  });

  passport.deserializeUser(async (email, done) => {
    const user = await UserService.findByKey(email, 'email').catch(err => {
      console.log('Error deserializing', err);
      done(err, null);
    });

    const userDto = new UserDto(user);
    const userData = { ...userDto };

    if (user) done(null, userData);
  });
};

export default mwPassport;
