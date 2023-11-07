import { round } from 'lodash';
import { compose, uniq, map, isArray, get, find, isEmpty, reduce } from 'lodash/fp';
import moment from 'moment';
import { TIME_FORMAT } from '../constants';

/**
 * @description Returns the extracted object
 * @param {Object} data - received data from the table using Sequelize
 * @returns {Object}
 */
export const extractDataFromResponseDB = data => {
  if (isArray(data)) {
    const dataValues = get([1, 'dataValues'], data);

    return dataValues;
  }

  const { dataValues } = data;

  if (dataValues) return dataValues;

  return data;
};

export const getUniqNameOrders = orders => compose(uniq, map('name'))(orders);

export const getGridRowData = (orders, priceList, prevGridRowData) =>
  map(({ name, price, count, date, id }) => {
    const coin = find(['id', name], priceList);

    if (!coin) return {};

    const actualPrice = get(['current_price'], coin);
    const coinName = get(['name'], coin);
    const coinId = get(['id'], coin);
    const totalBuy = round(count * price, 3);
    const totalBuyActual = round(count * actualPrice, 3);
    const totalProfit = round((actualPrice - price) * count, 3);
    const prevCell = find(['id', id], prevGridRowData);
    const formatDate = moment(date).format(TIME_FORMAT);

    const totalProfitPercent = count > 0 ? ((actualPrice - price) / price) * 100 : 0;

    let lastModified;

    if (!prevCell) {
      lastModified = 0;
    } else {
      lastModified = round(totalProfit - prevCell.totalProfit, 3);
    }

    return {
      name: coinName,
      price,
      amount: count,
      totalBuy,
      totalBuyActual,
      date: formatDate,
      totalProfit,
      totalProfitPercent,
      lastModified,
      actualPrice,
      coinId,
      id,
    };
  }, orders);

export const getComparisonOrdersAndPriceList = (orderList, priceList) => {
  if (isEmpty(orderList)) return {};

  return reduce(
    (acc, { name, price, count }) => {
      const coin = find(['id', name], priceList);

      if (!coin) return acc;

      const actualPrice = get(['current_price'], coin);

      const netProfit = (actualPrice - price) * count;
      const totalBuy = actualPrice * count;

      if (acc[name]) {
        acc[name].netProfit += netProfit;
        acc[name].totalBuy += totalBuy;
      } else {
        acc[name] = {
          name: coin.name,
          netProfit,
          totalBuy,
        };
      }

      return acc;
    },
    {},
    orderList,
  );
};

export const getNetProfit = comparisonOrdersAndPriceList => {
  if (isEmpty(comparisonOrdersAndPriceList)) return 0;

  return reduce((acc, { netProfit }) => acc + netProfit, 0, comparisonOrdersAndPriceList);
};

export const getTotalInvested = orderList => {
  if (isEmpty(orderList)) return 0;

  return reduce((acc, { price, count }) => acc + price * count, 0, orderList);
};

export const getNetProfitPercent = (netProfit, totalInvested) => (netProfit * 100) / totalInvested;

export const getWalletState = (netProfit, totalInvested) => netProfit + totalInvested;
