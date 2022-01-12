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

export const getlastModifiedPercentAvg = params => {
  const allLeafChildren = get(['rowNode', 'allLeafChildren'], params);

  if (isEmpty(allLeafChildren)) return 0;

  const lastModified = get([0, 'data', 'lastModified'], allLeafChildren);
  const totalBuyActual = get([0, 'data', 'totalBuyActual'], allLeafChildren);

  return (lastModified * 100) / totalBuyActual;
};

export const getProfitPercentAvg = params => {
  const allLeafChildren = get(['rowNode', 'allLeafChildren'], params);

  if (isEmpty(allLeafChildren)) return 0;

  const actualPrice = get([0, 'data', 'actualPrice'], allLeafChildren);
  const price = getPriceAvg(params);

  return ((actualPrice - price) * 100) / price;
};
