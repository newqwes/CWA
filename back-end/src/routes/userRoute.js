import express from 'express';

import authMiddleware from '../middleware/authMiddleware';

import { deleteUser } from '../controllers/userController';

const userRoute = express.Router();

userRoute.delete('/delete', authMiddleware, deleteUser);

export default userRoute;
