import Order from '../database/models/order';
import User from '../database/models/user';
import createResponse from '../utils/createResponse';

class UserService {
  async findByKey(value, key) {
    if(!value) return null;
    return await User.findOne({where: {[key]: value}});
  }

  async findByTelegramUserId(telegramUserId) {
    try {
      return await User.findOne({where: {telegramUserId}, raw: true});
    } catch (error) {
      return false;
    }
  }

  async findOrCreateByEmail(email, defaults) {
    try {
      const [user, created] = await User.findOrCreate({ where: { email }, defaults });

      return { user, created };
    } catch (error) {
      createResponse(500, 'Server Error findOrCreateByEmail', error);
    }
  }

  async deleteUser(userId) {
    try {
      const isUserFound = await User.destroy({ where: { id: userId } });

      await Order.destroy({ where: { userId } });

      if (isUserFound) return createResponse(200, 'Данные успешно удалены!');

      return createResponse(404, 'Пользователь не был найден!');
    } catch (error) {
      createResponse(500, 'Server Error findOrCreateByEmail', error);
    }
  }
}

export default new UserService();
