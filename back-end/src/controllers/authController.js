import { validationResult } from 'express-validator';
import { pick, values } from 'lodash/fp';
import { REGISTRATION_REQUEST_BODY } from '../constants/requestBody';

import ApiError from '../exceptions/apiError';
import authService from '../services/authService';

export const login = async (req, res, next) => {
  try {
    const result = await authService.login(req.body);

    return res.status(result.status).json(result);
  } catch (e) {
    next(e);
  }
};

export const register = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return next(ApiError.BadRequest('Ошибка при валидации', errors.array()));
    }

    const registerBody = pick(values(REGISTRATION_REQUEST_BODY), req.body);

    const result = await authService.create(registerBody);

    res.cookie('refreshToken', result.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      // secure: true // if have https
    });

    return res.status(result.status).json(result);
  } catch (e) {
    next(e);
  }
};
