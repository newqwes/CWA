import express from 'express';

import { USER_ROLES } from '../constants';
import checkRole from '../middleware/checkRole';

import { getUserInfo, updateUser, deleteUser } from '../controllers/userController';

const userRoute = express.Router();

const { user, admin } = USER_ROLES;

userRoute.get('/', checkRole([user, admin]), getUserInfo);

userRoute.put('/', checkRole([user, admin]), updateUser);

userRoute.delete('/delete/', checkRole([user, admin]), deleteUser);

export default userRoute;
