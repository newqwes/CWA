import express from 'express';
import authMiddleware from '../middleware/authMiddleware';
import { deleteUser, getUserList, getUserPlaceList, setUserPlace, getUserMainData } from '../controllers/userController';

const userRoute = express.Router();

userRoute.delete('/delete', authMiddleware, deleteUser);
userRoute.get('/', authMiddleware, getUserList);
userRoute.get('/place', authMiddleware, getUserPlaceList);
userRoute.post('/place', authMiddleware, setUserPlace);

userRoute.get('/main/:telegramKey', getUserMainData);

export default userRoute;
