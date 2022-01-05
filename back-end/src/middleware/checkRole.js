import passport from 'passport';

import { USER_ROLES } from '../constants';

const checkRole = roles => (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (err) {
      res.status(403).send('Not authorized to access');

      return;
    }

    if (roles.includes(USER_ROLES.guest) && !user) {
      next();

      return;
    }

    if (roles.includes(user.userType)) {
      req.user = user;
      next();

      return;
    }

    return res.status(403).send('Not authorized to access');
  })(req, res, next);
};

export default checkRole;
