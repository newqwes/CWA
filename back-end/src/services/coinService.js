import { getGeckoCoins } from '../utils/coinGeckoClient';

class СoinService {
  async getCoins({ coins }) {
    const data = await getGeckoCoins(coins);

    return data;
  }
}

export default new СoinService();
