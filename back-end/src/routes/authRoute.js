import express from 'express';
import { body } from 'express-validator';
import passport from 'passport';

import { LINK_REQUEST_PARAM, REGISTRATION_REQUEST_BODY } from '../constants/requestBody';

import { login, registration, activate } from '../controllers/authController';
import authMiddleware from '../middleware/authMiddleware';

const authRoute = express.Router();

authRoute.post('/login', login);

authRoute.post(
  '/registration',
  body(REGISTRATION_REQUEST_BODY.email).isEmail(),
  body(REGISTRATION_REQUEST_BODY.login).isLength({ min: 4, max: 20 }),
  body(REGISTRATION_REQUEST_BODY.password).isLength({ min: 6, max: 32 }),
  registration,
);

authRoute.get(`/activate/:${LINK_REQUEST_PARAM}`, activate);

authRoute.get('/google', passport.authenticate('google', { scope: ['email', 'profile'] }));

authRoute.get(
  '/google/callback',
  passport.authenticate('google', {
    failureMessage: 'Невозможно авторизоваться при помощи Google, попробуйте позже!',
    successRedirect: process.env.CLIENT_URL_GOOGLE_SUCCESS,
    failureRedirect: process.env.CLIENT_URL_GOOGLE_FAILURE,
  }),
  (req, res) => {
    console.log('Callback google SUCCESS user: ', req.user);
    res.send('Спасибо за авторизацию!');

    res.cookie('refreshToken', req.user.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: true, // if have https
    });
  },
);

authRoute.get('/protected', authMiddleware, (req, res) => {
  console.log('/protected ', req.user);
  res.send('Только авторизованные!');
});

export default authRoute;
