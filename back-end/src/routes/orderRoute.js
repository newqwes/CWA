import express from 'express';

import { USER_ROLES } from '../constants';
import checkRole from '../middleware/checkRole';

import { getUserOrders, deleteUserOrder } from '../controllers/orderController';

const orderRoute = express.Router();

const { admin, user } = USER_ROLES;

orderRoute.get('/', checkRole([user, admin]), getUserOrders);

orderRoute.delete('/delete/:orderId', checkRole([admin]), deleteUserOrder);

export default orderRoute;
