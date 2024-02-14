import express from 'express';

import authMiddleware from '../middleware/authMiddleware';

import {
  deleteUserOrder,
  editUserOrder,
  getBackupUserOrders,
  getUserOrders,
  setUserOrder,
  setUserOrders,
} from '../controllers/orderController';

const orderRoute = express.Router();

orderRoute.post('/', authMiddleware, setUserOrder);
orderRoute.post('/upload', authMiddleware, setUserOrders);
orderRoute.put('/update/:orderId', authMiddleware, editUserOrder);
orderRoute.get('/', authMiddleware, getUserOrders);
orderRoute.get('/backup', authMiddleware, getBackupUserOrders);
orderRoute.delete('/delete/:orderId', authMiddleware, deleteUserOrder);

export default orderRoute;
