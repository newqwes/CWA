import express from 'express';

import { USER_ROLES } from '../constants';
import checkRole from '../middleware/checkRole';

import { login, register } from '../controllers/authController';

const authRoute = express.Router();

const { guest, admin, user } = USER_ROLES;

authRoute.post('/login', checkRole([user, admin, guest]), login);

authRoute.post('/register', checkRole([user, admin, guest]), register);

export default authRoute;
