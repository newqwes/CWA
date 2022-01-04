export const REQUESTS_OPTIONS = {
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

export const PRICE_PROVIDER = 'coinmarketcap';
