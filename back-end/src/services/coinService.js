import { getGeckoCoins } from '../utils/coinGeckoClient';

class СoinService {
  async getCoins({ coins }) {
    console.log('sd', coins);
    const data = await getGeckoCoins(coins);

    return data;
  }
}

export default new СoinService();
