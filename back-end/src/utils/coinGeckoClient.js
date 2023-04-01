import axios from "axios";
import ApiError from "../exceptions/apiError";

export const getGeckoCoins = async list => {
  try {
    const { data } = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
      params: {
        vs_currency: 'usd',
        ids: list.join(),
        order: 'market_cap_desc',
        per_page: 300,
        page: 1,
        sparkline: false,
        locale: 'en'
      }
    })

    return data;
  } catch(e) {
    console.log('getGeckoCoins', e);
    throw ApiError.BadRequest(`getGeckoCoins not working.`);
  }
};
