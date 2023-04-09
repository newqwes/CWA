import createResponse from '../utils/createResponse';

import Order from '../database/models/order';
import { parseRawOrderList } from '../utils/parseRawOrderList';

class OrderService {
  async setUserOrder({ userId, count, coinId, price, date = Date.now() }) {
    try {
      await Order.create({ userId, date, name: coinId, count, price });

      return createResponse(201, 'Данные успешно добавленны!');
    } catch (error) {
      return createResponse(500, 'Server Error OrderService setUserOrder', error);
    }
  }

  async getUserOrders(userId) {
    try {
      const orders = await Order.findAll({ where: { userId } });

      return createResponse(200, 'Данные успешно получены!', orders);
    } catch (error) {
      return createResponse(500, 'Server Error OrderService getUserOrders', error);
    }
  }

  async getRawUserOrders(userId) {
    try {
      return Order.findAll({
        where: { userId },
        attributes: ['name', 'price', 'count', 'date', 'id'],
        raw: true,
      });
    } catch (error) {
      return error;
    }
  }

  async deleteUserOrder(orderId) {
    try {
      const isFound = await Order.destroy({ where: { id: orderId } });

      if (isFound) return createResponse(200, 'Данные успешно удалены!', orderId);

      return createResponse(404, 'Такой ордер не найден!', orderId);
    } catch (error) {
      return createResponse(500, 'Server Error OrderService getUserOrders', error);
    }
  }

  async setUserOrders({ userId, list }) {
    try {
      const orders = parseRawOrderList(list, userId);

      await Order.bulkCreate(orders);

      return createResponse(201, 'Данные успешно добавленны!');
    } catch (error) {
      return createResponse(500, 'Server Error OrderService setUserOrder', error);
    }
  }
}

export default new OrderService();
