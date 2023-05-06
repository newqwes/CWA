import express from 'express';
import authMiddleware from '../middleware/authMiddleware';
import { deleteUser, getUserList } from '../controllers/userController';

const userRoute = express.Router();

userRoute.delete('/delete', authMiddleware, deleteUser);
userRoute.get('/', authMiddleware, getUserList);

export default userRoute;
