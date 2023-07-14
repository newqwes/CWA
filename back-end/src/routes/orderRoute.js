import express from 'express';

import authMiddleware from '../middleware/authMiddleware';

import {
  setUserOrder,
  getUserOrders,
  deleteUserOrder,
  setUserOrders,
  getBackupUserOrders
} from '../controllers/orderController';

const orderRoute = express.Router();

orderRoute.post('/', authMiddleware, setUserOrder);
orderRoute.post('/upload', authMiddleware, setUserOrders);
orderRoute.get('/', authMiddleware, getUserOrders);
orderRoute.get('/backup', authMiddleware, getBackupUserOrders);
orderRoute.delete('/delete/:orderId', authMiddleware, deleteUserOrder);

export default orderRoute;
