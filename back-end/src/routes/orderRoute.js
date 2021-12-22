import express from 'express';

import authMiddleware from '../middleware/authMiddleware';

import { setUserOrder, getUserOrders, deleteUserOrder } from '../controllers/orderController';

const orderRoute = express.Router();

orderRoute.post('/', authMiddleware, setUserOrder);
orderRoute.get('/', authMiddleware, getUserOrders);

orderRoute.delete('/delete/:orderId', authMiddleware, deleteUserOrder);

export default orderRoute;
