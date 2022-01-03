import { get, reduce, find, map, isEmpty } from 'lodash/fp';
import { round } from 'lodash';
import { createSelector } from 'reselect';
import moment from 'moment';

import { getPrevGridRowData, getUserHistory, getUserLastPriceList, getUserPrevData } from './user';

const localState = get('order');

export const getOrderList = createSelector(localState, get('list'));

export const getTotalInvested = createSelector(getOrderList, orderList => {
  if (isEmpty(orderList)) return 0;

  return reduce((acc, { price, count }) => acc + price * count, 0, orderList);
});

export const getComparisonOrdersAndPriceList = createSelector(
  getOrderList,
  getUserLastPriceList,
  (orderList, priceList) => {
    if (isEmpty(orderList)) return {};

    return reduce(
      (acc, { name, price, count }) => {
        const coin = find(['symbol', name === 'BabyDoge' ? name : name.toUpperCase()], priceList);

        if (!coin) return acc;

        const actualPrice = get(['quote', 'USD', 'price'], coin);

        const netProfit = (actualPrice - price) * count;
        const totalBuy = actualPrice * count;

        if (acc[name]) {
          acc[name].netProfit += netProfit;
          acc[name].totalBuy += totalBuy;
        } else {
          acc[name] = {
            name,
            netProfit,
            totalBuy,
          };
        }

        return acc;
      },
      {},
      orderList,
    );
  },
);

export const getNetProfit = createSelector(
  getComparisonOrdersAndPriceList,
  comparisonOrdersAndPriceList => {
    if (isEmpty(comparisonOrdersAndPriceList)) return 0;

    return reduce((acc, { netProfit }) => acc + netProfit, 0, comparisonOrdersAndPriceList);
  },
);

export const getWalletState = createSelector(
  getNetProfit,
  getTotalInvested,
  (netProfit, totalInvested) => netProfit + totalInvested,
);

export const getTotalTransactionCount = createSelector(getOrderList, list => list.length);

export const getLastModified = createSelector(
  getWalletState,
  getUserPrevData,
  (walletState, prevData) => {
    const walletStateEmpty = walletState === 0 || isEmpty(prevData) || prevData.walletState === 0;
    if (walletStateEmpty) return 0;

    const lastModified = 100 - (walletState * 100) / prevData.walletState;

    return lastModified;
  },
);

export const getGridRowData = createSelector(
  getOrderList,
  getUserLastPriceList,
  getPrevGridRowData,
  (orders, priceList, prevGridRowData) =>
    map(({ name, price, count, date, id }) => {
      const coin = find(['symbol', name === 'BabyDoge' ? name : name.toUpperCase()], priceList);

      if (!coin) return {};

      const actualPrice = get(['quote', 'USD', 'price'], coin);
      const coinName = get(['name'], coin);
      const symbol = get(['symbol'], coin);
      const totalProfit = round((actualPrice - price) * count, 2);
      const prevCell = find(['id', id], prevGridRowData);

      let lastModified;

      if (!prevCell) {
        lastModified = 0;
      } else {
        lastModified = round(prevCell.totalProfit - totalProfit, 2);
      }

      return {
        name: coinName,
        symbol,
        price,
        amount: count,
        totalBuy: round(count * price, 2),
        date: moment(date).format('YYYY-MM-DD h:mm'),
        totalProfit,
        lastModified,
        id,
      };
    }, orders),
);

export const getChartData = createSelector(
  getComparisonOrdersAndPriceList,
  getUserHistory,
  (comparisonOrdersAndPriceList, userHistory) => {
    const donut = reduce(
      (acc, { name, totalBuy }) => {
        const modifiedName = name === 'BabyDoge' ? name : name.toUpperCase();

        const labelIndex = acc.options.labels.findIndex(value => value === modifiedName);

        if (labelIndex !== -1) {
          acc.series[labelIndex] += totalBuy;

          return acc;
        }

        acc.options.labels.push(modifiedName);
        acc.series.push(totalBuy);
        return acc;
      },
      { options: { labels: [] }, series: [] },
      comparisonOrdersAndPriceList,
    );

    const seriesData = map(({ date, lastModified }) => {
      let y = round(lastModified, 2);

      y = y > 6 ? 6 : y;
      y = y < -6 ? -6 : y;

      const series = { x: date, y };

      return series;
    }, userHistory);

    return {
      donut,
      area: {
        series: [
          {
            name: 'Цена портфеля',
            data: seriesData,
          },
        ],
        options: {
          stroke: {
            width: 2,
          },
          title: {
            text: 'Общий анализ портфеля',
            align: 'left',
          },
          subtitle: {
            text: 'Изменение цены',
            align: 'left',
          },
          xaxis: {
            type: 'datetime',
          },
          yaxis: {
            opposite: true,
          },
          legend: {
            horizontalAlign: 'left',
          },
        },
      },
    };
  },
);
