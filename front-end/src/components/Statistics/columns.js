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
    cellRenderer: 'IconCellRenderer',
  },
  {
    headerName: 'ID монеты',
    field: 'coinId',
    sortable: true,
    aggFunc: 'last',
  },
  {
    headerName: 'Цена',
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
    headerName: 'Состояние',
    field: 'totalBuyActual',
    sortable: true,
    aggFunc: 'sum',
    cellRenderer: 'totalBuyCellRenderer',
  },
  {
    headerName: 'Прибыли (убытков)',
    field: 'totalProfit',
    sortable: true,
    aggFunc: 'sum',
    cellRenderer: 'priceCellRenderer',
  },
  {
    headerName: '% Прибыли (убытков)',
    field: 'totalProfitPercent',
    sortable: true,
    aggFunc: getProfitPercentAvg,
    cellRenderer: 'percentCellRenderer',
  },
  {
    headerName: 'Изменение',
    field: 'lastModified',
    sortable: true,
    cellRenderer: 'lastChangeCellRenderer',
    aggFunc: 'sum',
  },
  {
    headerName: '% Изменение',
    field: 'lastModifiedPercent',
    sortable: true,
    aggFunc: getlastModifiedPercentAvg,
    cellRenderer: 'percentCellRenderer',
    sort: 'desc',
  },
  {
    headerName: 'Дата',
    field: 'date',
    sortable: true,
    aggFunc: 'last',
  },
  {
    headerName: 'Продать',
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
