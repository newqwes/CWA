import express from 'express';
import { body } from 'express-validator';

import { USER_ROLES } from '../constants';
import checkRole from '../middleware/checkRole';

import { login, registration } from '../controllers/authController';
import { REGISTRATION_REQUEST_BODY } from '../constants/requestBody';

const authRoute = express.Router();

const { guest, admin, user } = USER_ROLES;

authRoute.post('/login', checkRole([user, admin, guest]), login);

authRoute.post(
  '/registration',
  body(REGISTRATION_REQUEST_BODY.email).isEmail(),
  body(REGISTRATION_REQUEST_BODY.login).isLength({ min: 4, max: 20 }),
  body(REGISTRATION_REQUEST_BODY.password).isLength({ min: 6, max: 32 }),
  checkRole([user, admin, guest]),
  registration,
);

export default authRoute;
