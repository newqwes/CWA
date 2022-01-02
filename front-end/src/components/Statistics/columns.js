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
    headerName: 'Общая стоимость покупки',
    field: 'totalBuy',
    sortable: true,
    aggFunc: 'sum',
    cellRenderer: 'totalBuyCellRenderer',
  },
  {
    headerName: 'Общая прибыли (убытков)',
    field: 'totalProfit',
    sortable: true,
    aggFunc: 'sum',
    cellRenderer: 'totalBuyCellRenderer',
  },
  {
    headerName: 'Цена',
    field: 'price',
    sortable: true,
    cellRenderer: 'totalBuyCellRenderer',
    aggFunc: 'avg',
  },
  {
    headerName: 'Последнее изменение',
    field: 'lastModified',
    sortable: true,
    aggFunc: 'sum',
  },

  {
    headerName: 'Дата покупки',
    field: 'date',
    sortable: true,
    aggFunc: 'last',
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

export const autoGroupColumnDef = { field: 'name', headerName: 'Наименование' };

export const groupDisplayType = 'singleColumn';
