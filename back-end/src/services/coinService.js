import { getGeckoCoins } from '../utils/coinGeckoClient';

class CoinService {
  async getCoins({ coins }) {
    return getGeckoCoins(coins);
  }
}

export default new CoinService();
