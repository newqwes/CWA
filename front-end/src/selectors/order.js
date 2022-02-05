import { get, reduce, find, map, isEmpty, compose, uniq, isEqual, drop } from 'lodash/fp';
import { round } from 'lodash';
import { createSelector } from 'reselect';
import moment from 'moment';

import { getPrevGridRowData, getUserHistory, getUserLastPriceList, getUserPrevData } from './user';

const localState = get('order');

export const getOrderList = createSelector(localState, get('list'));

export const getOrderCoinList = createSelector(getOrderList, compose(uniq, map('name')));

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

    const lastModified = (walletState * 100) / prevData.walletState - 100;

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
      const icon = get(['icon'], coin);
      const totalBuy = round(count * price, 2);
      const totalBuyActual = round(count * actualPrice, 2);
      const totalProfit = round((actualPrice - price) * count, 2);
      const prevCell = find(['id', id], prevGridRowData);
      const formatDate = moment(date).format('YYYY-MM-DD h:mm');

      const totalProfitPercent = count > 0 ? ((actualPrice - price) / price) * 100 : 0;

      let lastModified;

      if (!prevCell) {
        lastModified = 0;
      } else {
        lastModified = round(totalProfit - prevCell.totalProfit, 2);
      }

      return {
        name: coinName,
        symbol,
        price,
        amount: count,
        totalBuy,
        totalBuyActual,
        date: formatDate,
        totalProfit,
        totalProfitPercent,
        lastModified,
        actualPrice,
        icon,
        id,
      };
    }, orders),
);

export const getChartData = createSelector(
  getComparisonOrdersAndPriceList,
  getUserHistory,
  getNetProfit,
  (comparisonOrdersAndPriceList, userHistory, netProfit) => {
    const prepareOrders = reduce(
      (acc, { name, totalBuy }) => {
        const modifiedName = name === 'BabyDoge' ? name : name.toUpperCase();

        acc.push({ totalBuy, modifiedName });

        return acc;
      },
      [],
      comparisonOrdersAndPriceList,
    );

    prepareOrders.sort(({ totalBuy }, b) => b.totalBuy - totalBuy);

    const donut = reduce(
      (acc, { totalBuy, modifiedName }) => {
        const price = round(totalBuy, 1);

        if (isEqual(price, 0)) {
          return acc;
        }

        acc.series.push(price);
        acc.options.labels.push(modifiedName);

        return acc;
      },
      { options: { labels: [] }, series: [] },
      prepareOrders,
    );

    let x = 0;

    const seriesData = map(
      // eslint-disable-next-line no-plusplus
      ({ lastModified }) => ({ x: x++, y: round(lastModified, 1) }),
      userHistory,
    );

    return {
      donut,
      area: {
        series: [
          {
            name: 'Чистая прибыль',
            // eslint-disable-next-line no-plusplus
            data: drop(2, [...seriesData, { x: x++, y: round(netProfit, 1) }]),
          },
        ],
        options: {
          stroke: {
            show: true,
            curve: 'smooth',
            lineCap: 'butt',
            width: 2,
            dashArray: 0,
          },
          title: {
            text: 'Общий анализ прибыли',
            align: 'left',
          },
          subtitle: {
            text: 'Изменение цены',
            align: 'left',
          },
          xaxis: {
            type: 'number',
          },
          yaxis: {
            opposite: true,
          },
          legend: {
            horizontalAlign: 'left',
          },
          dataLabels: {
            enabled: false,
          },
        },
      },
    };
  },
);
