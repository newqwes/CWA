import { get, reduce, find, map } from 'lodash/fp';
import { round } from 'lodash';
import { createSelector } from 'reselect';
import moment from 'moment';

import { getUserLastPriceList, getUserPrevData } from './user';

const localState = get('order');

export const getOrderList = createSelector(localState, get('list'));

export const getTotalInvested = createSelector(
  getOrderList,
  reduce((acc, { price, count }) => acc + price * count, 0),
);

export const getComparisonOrdersAndPriceList = createSelector(
  getOrderList,
  getUserLastPriceList,
  (orders, priceList) =>
    reduce(
      (acc, { name, price, count }) => {
        const coin = find(['symbol', name.toUpperCase()], priceList);

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
      orders,
    ),
);

export const getNetProfit = createSelector(
  getComparisonOrdersAndPriceList,
  reduce((acc, { netProfit }) => acc + netProfit, 0),
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
  (walletState, prevData) => 100 - (walletState * 100) / prevData.walletState,
);

export const getGridRowData = createSelector(
  getOrderList,
  getUserLastPriceList,
  (orders, priceList) =>
    map(({ name, price, count, date }) => {
      const coin = find(['symbol', name.toUpperCase()], priceList);

      if (!coin) return {};

      const actualPrice = get(['quote', 'USD', 'price'], coin);
      const coinName = get(['name'], coin);
      const symbol = get(['symbol'], coin);
      const totalProfit = round((actualPrice - price) * count, 2);

      return {
        name: `${coinName} (${symbol})`,
        price,
        amount: count,
        totalBuy: round(count * price, 2),
        date: moment(date).format('YYYY-MM-DD h:mm'),
        totalProfit,
      };
    }, orders),
);

export const chartData = {
  donut: {
    options: { labels: ['XRP', 'BTC', 'ETH', 'BLOK', 'SAMO'] },
    series: [30.46, 4.32, 6.77, 2.23, 6.34],
  },
  area: {
    series: [
      {
        name: 'Цена портфеля',
        data: [
          {
            x: new Date('2021-02-12').getTime(),
            y: 76,
          },
          {
            x: new Date('2021-02-15').getTime(),
            y: 65,
          },
          {
            x: new Date('2021-03-05').getTime(),
            y: 130,
          },
          {
            x: new Date('2021-03-15').getTime(),
            y: 120,
          },
        ],
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

export const getChartData = createSelector(
  getComparisonOrdersAndPriceList,
  comparisonOrdersAndPriceList => {
    const test = reduce(
      (acc, { name, totalBuy }) => {
        acc.donut.options.labels.push(name.toUpperCase());
        acc.donut.series.push(totalBuy);
        return acc;
      },
      { donut: { options: { labels: [] }, series: [] } },
      comparisonOrdersAndPriceList,
    );

    console.log(test);
    return chartData;
  },
);
