import { get, isEmpty, reduce } from 'lodash/fp';
import { toNormalNumber } from './toNormalNumber';

export const getPriceAvg = params => {
  const allLeafChildren = get(['rowNode', 'allLeafChildren'], params);

  if (isEmpty(allLeafChildren)) return 0;

  const amountAndPurchase = reduce(
    (acc, children) => {
      const amount = get(['data', 'amount'], children);
      const price = get(['data', 'price'], children);

      if (amount > 0) {
        acc.amount += amount;
        acc.purchase += price * amount;
      }

      return acc;
    },
    { amount: 0, purchase: 0 },
    allLeafChildren,
  );

  const result = amountAndPurchase.purchase / amountAndPurchase.amount;

  return result;
};

export const getSellPrice = params => {
  const avgPrice = getPriceAvg(params);

  const sellPrice = avgPrice * 3;

  return `${toNormalNumber(sellPrice)} $`;
};
