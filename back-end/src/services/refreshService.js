import CoinGecko from 'coingecko-api';

import UserDto from '../dto/userDto';
import ApiError from '../exceptions/apiError';
import userService from './userService';
import History from '../database/models/history';

const CoinGeckoClient = new CoinGecko();

class RefreshService {
  async refresh({ userId, prevData, coinList }) {
    const user = await userService.findByKey(userId, 'id');

    if (!user) {
      throw ApiError.BadRequest('Пользователь с таким ID не существует');
    }

    const { data } = await CoinGeckoClient.coins.markets({
      per_page: 300,
      localization: false,
      ids: coinList,
    });

    user.score += 1;
    user.prevData = prevData;
    user.lastDateUpdate = Date.now();
    user.list = data;
    await user.save();

    await History.create({
      lastModified: prevData.netProfit,
      userId,
      date: Date.now(),
    });

    const history = await History.findAll({ where: { userId } });

    const userDto = new UserDto(user);
    const userData = { ...userDto, history };

    return userData;
  }
}

export default new RefreshService();
