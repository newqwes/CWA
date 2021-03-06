import { pick, values } from 'lodash/fp';

import { ORDER_REQUEST_BODY } from '../constants/requestBody';
import { someFalsey } from '../utils/boolean';
import { getUserId } from '../utils/user';

import ApiError from '../exceptions/apiError';
import orderService from '../services/orderService';

export const setUserOrder = async (req, res, next) => {
  const userId = getUserId(req);

  const { count, coinId, price, date } = pick(values(ORDER_REQUEST_BODY), req.body);

  if (someFalsey([userId, count, coinId, price])) {
    return next(ApiError.BadRequest('Ошибка при валидации'));
  }

  await orderService.setUserOrder({ userId, count, coinId, price, date });

  const { status, data } = await orderService.getUserOrders(userId);

  res.status(status).json(data);
};

export const getUserOrders = async (req, res, next) => {
  const userId = getUserId(req);

  if (!userId) {
    return next(ApiError.BadRequest('Пользователь не найден'));
  }

  const { status, data } = await orderService.getUserOrders(userId);

  res.status(status).json(data);
};

export const deleteUserOrder = async (req, res) => {
  const { status, data } = await orderService.deleteUserOrder(req.params.orderId);

  res.status(status).json(data);
};

export const setUserOrders = async (req, res, next) => {
  const userId = getUserId(req);

  const { list } = pick(['list'], req.body);

  if (someFalsey([userId, list])) {
    return next(ApiError.BadRequest('Ошибка при валидации'));
  }

  await orderService.setUserOrders({ userId, list });

  const { status, data } = await orderService.getUserOrders(userId);

  res.status(status).json(data);
};
