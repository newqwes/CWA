import UserDto from '../dto/userDto';
import ApiError from '../exceptions/apiError';
import userService from './userService';
import History from '../database/models/history';
import { getGeckoCoins } from '../utils/coinGeckoClient';

class RefreshService {
  async refresh({ userId, prevData, coinList }) {
    const user = await userService.findByKey(userId, 'id');

    if (!user) {
      throw ApiError.BadRequest('Пользователь с таким ID не существует');
    }

    if (user.score <= 0) {
      throw ApiError.BadRequest('Недостаточно средств, необходимо 1 CWA');
    }

    const data = await getGeckoCoins(coinList);

    user.score -= 1;
    user.prevData = prevData;
    user.lastDateUpdate = Date.now();
    user.list = data;
    await user.save();

    await History.create({
      lastModified: prevData.netProfit,
      userId,
      date: Date.now(),
    });

    const history = await History.findAll({
      where: { userId },
      raw: true,
      order: [['date', 'ASC']],
    });

    const userDto = new UserDto(user);
    return { ...userDto, history };
  }
}

export default new RefreshService();
