import createResponse from '../utils/createResponse';

import Order from '../database/models/order';

class OrderService {
  async setUserOrder({ userId, count, name, price, date }) {
    try {
      await Order.create({ userId, date, name, count, price });

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
}

export default new OrderService();
