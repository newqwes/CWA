import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import dotenv from 'dotenv';
import User from '../database/models/user';
import createResponse from '../utils/createResponse';

dotenv.config();

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.ACCESS_TOKEN_SECRET,
};

const mwPassport = passport => {
  passport.use(
    new JwtStrategy(options, async ({ id }, done) => {
      try {
        const user = await User.findOne({ where: { id } });

        user ? done(null, user) : done(null, false);
      } catch (error) {
        return createResponse(500, 'Server Error', error);
      }
    }),
  );
};

export default mwPassport;
