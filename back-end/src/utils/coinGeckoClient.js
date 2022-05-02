import CoinGecko from 'coingecko-api';

export const CoinGeckoClient = new CoinGecko();

export const getGeckoCoins = async list => {
  const { data } = await CoinGeckoClient.coins.markets({
    per_page: 300,
    localization: false,
    ids: list,
  });

  return data;
};
