import { getUserId } from '../utils/user';
import createResponse from '../utils/createResponse';

import Order from '../database/models/order';

class OrderService {
  async getUserOrders(req) {
    try {
      const userId = getUserId(req);

      const orders = await Order.findAll({
        where: { userId },
      });

      return createResponse(200, 'Successfully!', orders);
    } catch (error) {
      return createResponse(500, 'Server Error', error);
    }
  }

  async deleteUserOrder(orderId) {
    try {
      const isFound = await Order.destroy({ where: { orderId } });

      if (isFound) return createResponse(200, 'Successfully!', orderId);

      return createResponse(404, 'Not found', orderId);
    } catch (error) {
      return createResponse(500, 'Server Error', error);
    }
  }
}

export default new OrderService();
