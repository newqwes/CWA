import {
  getPriceAvg,
  getProfitPercentAvg,
  getSellPrice,
  getlastModifiedPercentAvg,
} from '../../utils/aggFunc';

export const columnDefs = ({ deleteOrder }) => [
  {
    field: 'name',
    sortable: true,
    rowGroup: true,
    hide: true,
    cellRenderer: 'symbolCellRenderer',
  },
  {
    headerName: 'Символ',
    field: 'symbol',
    sortable: true,
    aggFunc: 'last',
  },
  {
    headerName: 'Текущая цена',
    field: 'actualPrice',
    sortable: true,
    cellRenderer: 'actualPriceCellRenderer',
    aggFunc: 'last',
  },
  {
    headerName: 'Ср. Цена покупки',
    field: 'price',
    sortable: true,
    cellRenderer: 'totalBuyCellRenderer',
    aggFunc: getPriceAvg,
  },
  {
    headerName: 'Количество',
    field: 'amount',
    sortable: true,
    aggFunc: 'sum',
    cellRenderer: 'amountCellRenderer',
  },
  {
    headerName: 'Вложил',
    field: 'totalBuy',
    sortable: true,
    aggFunc: 'sum',
    cellRenderer: 'totalBuyCellRenderer',
  },
  {
    headerName: 'Текущее состояние',
    field: 'totalBuyActual',
    sortable: true,
    aggFunc: 'sum',
    cellRenderer: 'totalBuyCellRenderer',
  },
  {
    headerName: 'Общая прибыли (убытков)',
    field: 'totalProfit',
    sortable: true,
    aggFunc: 'sum',
    cellRenderer: 'priceCellRenderer',
  },
  {
    headerName: '% Общая прибыли (убытков)',
    field: 'totalProfitPercent',
    sortable: true,
    aggFunc: getProfitPercentAvg,
    cellRenderer: 'percentCellRenderer',
  },
  {
    headerName: 'Последнее изменение',
    field: 'lastModified',
    sortable: true,
    cellRenderer: 'lastChangeCellRenderer',
    aggFunc: 'sum',
  },
  {
    headerName: '% Последнее изменение',
    field: 'lastModifiedPercent',
    sortable: true,
    aggFunc: getlastModifiedPercentAvg,
    cellRenderer: 'percentCellRenderer',
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
    aggFunc: getSellPrice,
  },
  {
    headerName: 'Иконка',
    field: 'icon',
    aggFunc: 'last',
    hide: true,
  },
  {
    field: 'athlete',
    headerName: 'Уд.',
    cellRenderer: 'deleteButtonCellRenderer',
    hide: true,
    cellRendererParams: {
      deleteOrder,
    },
    maxWidth: 100,
  },
];

export const defaultColDef = {
  flex: 1,
  resizable: true,
};

export const autoGroupColumnDef = { field: 'name', headerName: 'Наименование', minWidth: 250 };

export const groupDisplayType = 'singleColumn';
