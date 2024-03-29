import { map } from 'lodash/fp';

export const PARSE_STRING_REGEX = /\S{1,}\s(-?)\d{0,}(\.|)(\d{0,}|)\s=\s\d{0,}(\.|)(\d{0,})\s(\S+)/gm;

export const parseRawOrderList = (stringData, userId) => {
  const data = stringData.match(PARSE_STRING_REGEX);

  if (!data) return;

  const orders = map(order => {
    const [name, count, , price, place] = order.split(' ');

    return {
      userId,
      date: Date.now(),
      name,
      count,
      price,
      place
    };
  }, data);

  return orders;
};
