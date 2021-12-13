import { validationResult } from 'express-validator';
import { pick, values, omit, get } from 'lodash/fp';
import passport from 'passport';

import { CLIENT_URL } from '../constants';
import {
  REGISTRATION_REQUEST_BODY,
  AUTHORIZATION_REQUEST_BODY,
  LINK_REQUEST_PARAM,
} from '../constants/requestBody';

import ApiError from '../exceptions/apiError';
import authService from '../services/authService';

export const login = async (req, res, next) => {
  try {
    const authBody = pick(values(AUTHORIZATION_REQUEST_BODY), req.body);

    const userData = await authService.login(authBody);

    return res.status('200').json(omit(['refreshToken'], userData));
  } catch (e) {
    next(e);
  }
};

export const registration = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return next(ApiError.BadRequest('Ошибка при валидации', errors.array()));
    }

    const registrationBody = pick(values(REGISTRATION_REQUEST_BODY), req.body);

    const userData = await authService.create(registrationBody);

    res.cookie('refreshToken', userData.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: true, // if have https
    });

    return res.status('201').json(omit(['refreshToken'], userData));
  } catch (e) {
    next(e);
  }
};

export const activate = async (req, res, next) => {
  try {
    const activationHash = get(['params', LINK_REQUEST_PARAM], req);

    await authService.activate(activationHash);

    return res.redirect(process.env.CLIENT_URL);
  } catch (e) {
    next(e);
  }
};

export const google = passport.authenticate('google', { scope: ['email', 'profile'] });

export const googleCallback = passport.authenticate('google', {
  successRedirect: CLIENT_URL,
  failureRedirect: '/api/auth/failure',
});

export const failure = async (req, res, next) => {
  try {
    return next(ApiError.BadRequest('Ошибка авторизации'));
  } catch (e) {
    next(e);
  }
};
