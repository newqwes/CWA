import rp from 'request-promise';

import UserDto from '../dto/userDto';
import ApiError from '../exceptions/apiError';
import userService from './userService';
import CoinList from '../database/models/coinList';
import { PRICE_PROVIDER } from '../constants';

const REQUESTS_OPTIONS = {
  method: 'GET',
  uri: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
  qs: {
    start: '1',
    limit: '5000',
    convert: 'USD',
  },
  headers: {
    'X-CMC_PRO_API_KEY': process.env.COINMARKETCAP_AUTH_KEY,
  },
  json: true,
  gzip: true,
};

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

setLastCoinPrice();

setInterval(() => {
  console.log('setInterval done!');
  setLastCoinPrice();
}, 1000 * 60 * 60);

class RefreshService {
  async refresh(id, prevData) {
    const user = await userService.findByKey(id, 'id');

    if (!user) {
      throw ApiError.BadRequest('Пользователь с таким ID не существует');
    }

    const { list } = await CoinList.findOne({ where: { name: PRICE_PROVIDER } });

    user.score += 1;
    user.prevData = prevData;
    user.lastDateUpdate = Date.now();
    user.list = list;
    await user.save();

    const userDto = new UserDto(user);
    const userData = { ...userDto };

    return userData;
  }
}

export default new RefreshService();
