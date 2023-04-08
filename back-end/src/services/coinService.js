import {getGeckoCoins} from '../utils/coinGeckoClient';

class CoinService {
  async getCoins({ coins }) {
    return await getGeckoCoins(coins);
  }
}

export default new CoinService();
