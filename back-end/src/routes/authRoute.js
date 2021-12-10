import express from 'express';
import { body } from 'express-validator';

import { login, registration, activate } from '../controllers/authController';
import { LINK_REQUEST_PARAM, REGISTRATION_REQUEST_BODY } from '../constants/requestBody';

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

export default authRoute;
