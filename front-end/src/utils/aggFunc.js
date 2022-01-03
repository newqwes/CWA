import { get, isEmpty, reduce } from 'lodash/fp';
import withoutExponential from './withoutExponential';

export const getPriceAvg = params => {
  const allLeafChildren = get(['rowNode', 'allLeafChildren'], params);

  if (isEmpty(allLeafChildren)) return 0;

  const amountAndPurchase = reduce(
    (acc, children) => {
      const amount = get(['data', 'amount'], children);
      const price = get(['data', 'price'], children);

      acc.amount += amount;
      acc.purchase += price * amount;

      return acc;
    },
    { amount: 0, purchase: 0 },
    allLeafChildren,
  );

  const result = amountAndPurchase.purchase / amountAndPurchase.amount;

  const avg = withoutExponential(result);

  return avg;
};

export const getSellPrice = params => {
  const avgPrice = getPriceAvg(params);

  const sellPrice = withoutExponential(avgPrice * 3);

  return sellPrice;
};

export const getSum = params => {
  console.log(params);

  return 21;
};
