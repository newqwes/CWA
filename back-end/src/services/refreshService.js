import rp from 'request-promise';
import { map, find, isEqual } from 'lodash/fp';

import UserDto from '../dto/userDto';
import ApiError from '../exceptions/apiError';
import userService from './userService';
import CoinList from '../database/models/coinList';
import History from '../database/models/history';

import { PRICE_PROVIDER, REQUESTS_OPTIONS } from '../constants/coinmarketcapConfig';

export const setLastCoinPrice = async () => {
  const { data } = await rp(REQUESTS_OPTIONS);

  const [coinList, created] = await CoinList.findOrCreate({
    where: { name: PRICE_PROVIDER },
    defaults: { list: data },
  });

  if (created) return coinList;

  coinList.name = PRICE_PROVIDER;
  coinList.list = data;
  await coinList.save();

  return data;
};

class RefreshService {
  async refresh({ userId, prevData, coinList }) {
    const user = await userService.findByKey(userId, 'id');

    if (!user) {
      throw ApiError.BadRequest('Пользователь с таким ID не существует');
    }

    const list = await setLastCoinPrice();

    const actualUserCoinList = map(coin => {
      const actualCoinData = find(
        ['symbol', isEqual(coin, 'BabyDoge') ? coin : coin.toUpperCase()],
        list,
      );

      return actualCoinData;
    }, coinList);

    user.score += 1;
    user.prevData = prevData;
    user.lastDateUpdate = Date.now();
    user.list = actualUserCoinList;
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
