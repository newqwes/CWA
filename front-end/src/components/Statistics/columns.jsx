export const columns = [
  {
    field: 'name',
    tooltipField: 'Наименование',
    width: '300px',
  },
  {
    tooltipField: 'Количество',
    field: 'amount',
  },
  {
    tooltipField: 'Общая цена покупки',
    field: 'totalBuy',
  },
  {
    tooltipField: 'Общая прибыли (убытков)',
    field: 'totalProfit',
  },
  {
    tooltipField: 'Цена',
    field: 'price',
    width: '300px',
  },
  {
    tooltipField: 'Ср. цена покупки',
    field: 'average',
  },
  {
    tooltipField: 'Последнее изменение',
    field: 'lastModified',
  },
];

export const data = [
  {
    key: '1',
    name: 'Ripple (XRP)',
    totalBuy: 234.2,
    totalProfit: -4.3,
    price: 0.882,
    lastModified: 23.3,
    amount: 32,
    average: 23.4,
    children: [
      {
        key: '153',
        name: 'Ripple (XRP)',
        totalBuy: 24.2,
        price: 0.881,
        amount: 29.3,
      },
      {
        key: '153',
        name: 'Ripple (XRP)',
        totalBuy: 218.33,
        price: 0.814,
        amount: 289.67,
      },
    ],
  },
  {
    key: '2',
    name: 'Ethereum (ETH)',
    lastModified: -23.3,
    totalBuy: 2334.2,
    totalProfit: 23.4,
    price: 3978.34,
    amount: 42,
    average: 3.1,
  },
  {
    key: '3',
    name: 'Bitcoin (BTC)',
    lastModified: 223.3,
    totalBuy: 4234.2,
    totalProfit: -14.32,
    price: 47653.344,
    amount: 32,
    average: 321.4,
  },
];

export const chartData = {
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
};
