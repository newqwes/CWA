import express from 'express';
import { getAvailableAvatars } from '../controllers/userController';

const userRoute = express.Router();

userRoute.get('/', getAvailableAvatars);

export default userRoute;
