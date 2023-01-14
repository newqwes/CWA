import { validationResult } from 'express-validator';
import { pick, values, omit, get } from 'lodash/fp';

import { REGISTRATION_REQUEST_BODY, AUTHORIZATION_REQUEST_BODY, LINK_REQUEST_PARAM } from '../constants/requestBody';
import History from '../database/models/history';

import ApiError from '../exceptions/apiError';
import authService from '../services/authService';
import UserDto from '../dto/userDto';

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
      secure: true // if have https
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

export const status = async (req, res, next) => {
  try {
    const userDto = new UserDto(req.user);
    const userData = { ...userDto };

    const history = await History.findAll({ where: { userId: userData.id }, order: [['date', 'ASC']] });

    return res.status('200').json({ ...userData, history });
  } catch (e) {
    next(e);
  }
};
