import {
  compose,
  drop,
  find,
  get,
  head,
  isEmpty,
  isEqual,
  last,
  map,
  reduce,
  toArray,
  uniq,
} from 'lodash/fp';

import { round } from 'lodash';
import { createSelector } from 'reselect';
import moment from 'moment';

import { getPrevGridRowData, getUserHistory, getUserLastPriceList, getUserPrevData } from './user';
import { MAX_PIE_LENGTH } from '../constants/chart';
import { TIME_FORMAT } from '../constants/time';

const localState = get('order');

export const getOrderList = createSelector(localState, get('list'));

export const isNotOrderList = createSelector(getOrderList, isEmpty);

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

export const getNetProfitPercent = createSelector(
  getNetProfit,
  getTotalInvested,
  (netProfit, totalInvested) => (netProfit * 100) / totalInvested,
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
      const coin = find(['id', name], priceList);

      if (!coin) return {};

      const actualPrice = get(['current_price'], coin);
      const coinName = get(['name'], coin);
      const icon = get(['image'], coin);
      const coinId = get(['id'], coin);
      const totalBuy = round(count * price, 2);
      const totalBuyActual = round(count * actualPrice, 2);
      const totalProfit = round((actualPrice - price) * count, 2);
      const prevCell = find(['id', id], prevGridRowData);
      const formatDate = moment(date).format(TIME_FORMAT);

      const totalProfitPercent = count > 0 ? ((actualPrice - price) / price) * 100 : 0;

      let lastModified;

      if (!prevCell) {
        lastModified = 0;
      } else {
        lastModified = round(totalProfit - prevCell.totalProfit, 2);
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
        icon,
        coinId,
        id,
      };
    }, orders),
);

export const getFilteredGridData = createSelector(getGridRowData, gridData => {
  const groupedByCoinId = reduce(
    (acc, { coinId, lastModified, totalBuyActual, name, icon }) => {
      if (acc[coinId]) {
        acc[coinId].lastModified += lastModified;
        acc[coinId].totalBuyActual += totalBuyActual;
        acc[coinId].differenceChange =
          (acc[coinId].lastModified * 100) / acc[coinId].totalBuyActual;
      } else {
        acc[coinId] = {
          lastModified,
          name,
          icon,
          totalBuyActual,
          differenceChange: (lastModified * 100) / totalBuyActual,
        };
      }

      return acc;
    },
    {},
    gridData,
  );

  const filteredGridData = toArray(groupedByCoinId).filter(
    ({ totalBuyActual, lastModified }) => totalBuyActual > 1 && Math.abs(lastModified) >= 0.01,
  );

  return filteredGridData;
});

export const getChartData = createSelector(
  getComparisonOrdersAndPriceList,
  getUserHistory,
  getNetProfitPercent,
  getFilteredGridData,
  (comparisonOrdersAndPriceList, userHistory, netProfitPercent, filteredGridData) => {
    const sortedOrders = toArray(comparisonOrdersAndPriceList).sort(
      ({ totalBuy }, b) => b.totalBuy - totalBuy,
    );

    const donut = reduce(
      (acc, { totalBuy, name }) => {
        const price = round(totalBuy, 1);

        if (isEqual(price, 0)) {
          return acc;
        }

        if (acc.series.length > MAX_PIE_LENGTH) {
          acc.series[MAX_PIE_LENGTH] += price;
          acc.options.labels[MAX_PIE_LENGTH] = 'Other coins';
        } else {
          acc.series.push(price);
          acc.options.labels.push(name);
        }

        return acc;
      },
      {
        options: {
          tooltip: {
            enabled: false,
          },
          legend: {
            show: true,
          },
          plotOptions: {
            pie: {
              donut: {
                labels: {
                  show: true,
                  name: {},
                  value: { formatter: n => `${n} $` },
                },
              },
              expandOnClick: false,
            },
          },
          labels: [],
        },
        series: [],
      },
      sortedOrders,
    );

    let x = 0;

    const seriesData = map(
      // eslint-disable-next-line no-plusplus
      ({ lastModified }) => ({ x: x++, y: round(lastModified, 1) }),
      userHistory,
    );

    const area = {
      series: [
        {
          name: 'Чистая прибыль',
          // eslint-disable-next-line no-plusplus
          data: drop(1, [...seriesData, { x: x++, y: round(netProfitPercent, 1) }]),
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
          text: 'Изменение цены в процентах',
          align: 'left',
        },
        xaxis: {
          type: 'category',
          labels: {
            show: false,
          },
        },
        tooltip: {
          x: {
            show: true,
            format: 'dd MMM',
            formatter: value => {
              if (userHistory.length <= value) {
                return moment().format(TIME_FORMAT);
              }

              return `${moment(userHistory[value].date).format(TIME_FORMAT)} ${round(userHistory[value].priceAmount, 0)}$`;
            },
          },
        },
        yaxis: {
          labels: {
            show: true,
            align: 'right',
            minWidth: 0,
            maxWidth: 160,
            style: {
              colors: [],
              fontSize: '12px',
              fontFamily: 'Helvetica, Arial, sans-serif',
              fontWeight: 400,
              cssClass: 'apexcharts-yaxis-label',
            },
            offsetX: 0,
            offsetY: 0,
            rotate: 0,
            formatter: value => `${round(value, 2)} %`,
          },
        },
        legend: {
          horizontalAlign: 'left',
        },
        dataLabels: {
          enabled: false,
        },
      },
    };

    const sortedGridData = toArray(filteredGridData).sort(
      ({ lastModified }, b) => b.lastModified - lastModified,
    );

    const treemap = {
      options: {
        legend: {
          show: false,
        },
        title: {
          text: 'Последние изменения монет в $ к Вашему кошельку',
        },
        dataLabels: {
          enabled: true,
          style: {
            fontSize: '12px',
          },
          formatter(text, op) {
            return [text, `${round(op.value, 2)}$`];
          },
          offsetY: -4,
        },
        tooltip: {
          y: {
            formatter: value => `${value}$`,
          },
        },
        plotOptions: {
          treemap: {
            enableShades: true,
            shadeIntensity: 0,
            reverseNegativeShade: true,
            colorScale: {
              ranges: [
                {
                  from: -100,
                  to: 0,
                  color: '#CD363A',
                },
                {
                  from: 0.001,
                  to: 100,
                  color: '#52B12C',
                },
              ],
            },
          },
        },
      },
      series: [
        { data: map(({ name, lastModified }) => ({ x: name, y: lastModified }), sortedGridData) },
      ],
    };

    return {
      donut,
      area,
      treemap,
    };
  },
);

export const getEdgeCoins = createSelector(getFilteredGridData, filteredGridData => {
  const sortedGridData = toArray(filteredGridData).sort(
    ({ differenceChange }, b) => b.differenceChange - differenceChange,
  );

  const bestCoin = head(sortedGridData);
  const worstCoin = last(sortedGridData);

  if (!bestCoin || !worstCoin) {
    return {
      best: { name: '', differenceChange: 0, icon: '' },
      worst: { name: '', differenceChange: 0, icon: '' },
    };
  }

  return {
    best: bestCoin,
    worst: worstCoin,
  };
});
