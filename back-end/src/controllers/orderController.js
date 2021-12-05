import orderService from '../services/orderService';

export const createOrder = async (req, res) => {
  const result = await orderService.createOrder(req);

  res.status(result.status).json(result);
};

export const getUserOrders = async (req, res) => {
  const result = await orderService.getUserOrders(req);

  res.status(result.status).json(result);
};

export const deleteUserOrder = async (req, res) => {
  const result = await orderService.deleteUserOrder(req.params.orderId);

  res.status(result.status).json(result);
};
