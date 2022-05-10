/* eslint-disable indent */
import { get, map, find, sortBy, reduce, findIndex } from 'lodash/fp';
import { round } from 'lodash';

import { AUTH_TELEGRAM_CODE_REGEX } from '../constants/telegram';

export const isAuthCode = text => AUTH_TELEGRAM_CODE_REGEX.test(text);

export const removeAuthCode = text => text.replace(AUTH_TELEGRAM_CODE_REGEX, '');

const getDffIcon = number => (number >= 0 ? '🔼' : '🔻');

export const compareResults = refreshData => {
  const newList = get(['list'], refreshData);
  const oldList = get(['prevData', 'gridRowData'], refreshData);

  const oldNetProfit = get(['prevData', 'netProfit'], refreshData);
  const oldWalletState = get(['prevData', 'walletState'], refreshData);

  const uniqOldList = reduce(
    (acc, oldItem) => {
      const coinExistIndex = findIndex(['coinId', oldItem.coinId], acc);

      if (coinExistIndex !== -1) {
        const price =
          (acc[coinExistIndex].price * acc[coinExistIndex].amount +
            oldItem.price * oldItem.amount) /
          (acc[coinExistIndex].amount + oldItem.amount);

        acc[coinExistIndex] = {
          name: oldItem.name,
          date: oldItem.date,
          actualPrice: oldItem.actualPrice,
          coinId: oldItem.coinId,
          id: oldItem.id,
          amount: acc[coinExistIndex].amount + oldItem.amount,
          price,
          totalBuy: acc[coinExistIndex].totalBuy + oldItem.totalBuy,
          totalBuyActual: acc[coinExistIndex].totalBuyActual + oldItem.totalBuyActual,
          totalProfit: acc[coinExistIndex].totalProfit + oldItem.totalProfit,
        };

        return acc;
      }

      acc.push(oldItem);
      return acc;
    },
    [],
    oldList,
  );

  const listResult = map(oldItem => {
    const newItem = find(['id', oldItem.coinId], newList);

    if (!newItem) {
      return oldItem;
    }

    const actualPrice = newItem.current_price;
    const totalBuyActual = oldItem.amount * actualPrice;
    const totalProfit = totalBuyActual - oldItem.totalBuy;
    const totalProfitPercent = (totalBuyActual / oldItem.totalBuy) * 100 - 100;
    const lastModified = (actualPrice * 100) / oldItem.actualPrice - 100;

    return {
      name: oldItem.name,
      amount: oldItem.amount,
      totalBuy: oldItem.totalBuy,
      date: oldItem.date,
      price: oldItem.price,

      totalBuyActual,
      totalProfit,
      totalProfitPercent,
      actualPrice,
      lastModified,
      lastModifiedIcon: getDffIcon(lastModified),
    };
  }, uniqOldList);

  const totalAllBuy = reduce(
    (acc, { totalBuy }) => {
      // eslint-disable-next-line no-param-reassign
      acc += totalBuy;

      return acc;
    },
    0,
    listResult,
  );

  const walletState = reduce(
    (acc, { totalBuyActual }) => {
      // eslint-disable-next-line no-param-reassign
      acc += totalBuyActual;

      return acc;
    },
    0,
    listResult,
  );

  const netProfit = (walletState * 100) / totalAllBuy - 100;

  const diffNetProfit = netProfit - oldNetProfit;
  const diffWalletState = walletState - oldWalletState;
  const diffNetProfitIcon = getDffIcon(diffNetProfit);

  return {
    listResult,
    totalAllBuy,
    netProfit,
    diffNetProfit,
    walletState,
    diffNetProfitIcon,
    diffWalletState,
  };
};

export const getStatusEmoji = value => (value >= 0 ? '🟢' : '🔴');

export const getResultMessage = ({
  listResult,
  totalAllBuy,
  netProfit,
  diffNetProfit,
  walletState,
  diffNetProfitIcon,
  // diffWalletState,
}) => {
  const sortedResult = sortBy(['lastModified'], listResult).reverse();

  const arrOfMessages = map(
    ({
      name,
      totalProfit,
      totalBuy,
      lastModified,
      totalBuyActual,
      totalProfitPercent,
      lastModifiedIcon,
      // amount,
      // date,
      // price,
      // actualPrice,
    }) =>
      `${getStatusEmoji(totalProfit)} ${name}: ${round(totalBuyActual, 1)}$ (${round(
        totalProfitPercent,
        1,
      )}%)
      ${round(totalBuy, 2)}$ (${round(totalProfit, 2)}$) ${round(
        lastModified,
        2,
      )}% ${lastModifiedIcon}`,
    sortedResult,
  );

  const sumMessage = `
  Всего вложил: ${round(totalAllBuy, 2)}$
  Состояние кошелька: ${round(walletState, 2)}$
  ${netProfit >= 0 ? 'Доход' : 'Убыток'}: ${round(netProfit, 2)}% (${round(
    diffNetProfit,
    2,
  )}%) ${diffNetProfitIcon}`;

  return `${arrOfMessages.join('\n')}\n${sumMessage}`;
};
