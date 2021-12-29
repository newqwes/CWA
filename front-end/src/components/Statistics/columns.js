export const columnDefs = [
  {
    field: 'name',
    sortable: true,
    rowGroup: true,
    hide: true,
  },
  {
    headerName: 'Количество',
    field: 'amount',
    sortable: true,
    aggFunc: 'sum',
  },
  {
    headerName: 'Общая цена покупки',
    field: 'totalBuy',
    sortable: true,
    cellRenderer: 'totalBuyCellRenderer',
  },
  {
    headerName: 'Общая прибыли (убытков)',
    field: 'totalProfit',
    sortable: true,
    aggFunc: 'sum',
  },
  {
    headerName: 'Цена',
    field: 'price',
    sortable: true,
  },
  {
    headerName: 'Ср. цена покупки',
    field: 'average',
    sortable: true,
  },
  {
    headerName: 'Последнее изменение',
    field: 'lastModified',
    sortable: true,
    aggFunc: 'sum',
  },
  {
    headerName: 'Цена продажи 1/3',
    field: 'priceToSell',
    sortable: true,
  },
];

export const defaultColDef = {
  flex: 1,
  resizable: true,
};

export const rowData = [
  {
    name: 'Ripple (XRP)',
    totalBuy: 234.2,
    totalProfit: -4.3,
    price: 0.882,
    lastModified: 23.3,
    amount: 32,
    average: 23.4,
    priceToSell: 2.93,
  },
  {
    name: 'Ripple (XRP)',
    price: 0.51,
    amount: 19.3,
    totalProfit: -4.3,
    lastModified: 23.3,
    average: 23.4,
    priceToSell: 2.93,
  },
  {
    name: 'Ripple (XRP)',
    price: 1.21,
    amount: 3.2,
    totalProfit: -32.3,
    lastModified: 23.3,
    average: 23.4,
    priceToSell: 2.93,
  },
  {
    name: 'Ethereum (ETH)',
    lastModified: -23.3,
    totalBuy: 2334.2,
    totalProfit: 23.4,
    price: 3978.34,
    amount: 42,
    average: 3.1,
    priceToSell: 9143.32,
  },
  {
    name: 'Ethereum (ETH)',
    lastModified: -23.3,
    totalBuy: 2334.2,
    totalProfit: 23.4,
    price: 3978.34,
    amount: 42,
    average: 3.1,
    priceToSell: 9143.32,
  },
  {
    name: 'Bitcoin (BTC)',
    lastModified: 223.3,
    totalBuy: 4234.2,
    totalProfit: -14.32,
    price: 47653.344,
    amount: 32,
    average: 321.4,
    priceToSell: 130899.45,
  },
];

export const autoGroupColumnDef = { field: 'name', headerName: 'Наименование' };

export const groupDisplayType = 'singleColumn';

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
