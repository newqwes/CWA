import {
  getPriceAvg,
  getProfitPercentAvg,
  getSellPrice,
  getlastModifiedPercentAvg,
  getPlaceNames,
} from '../../utils/aggFunc';

export const columnDefs = ({ deleteOrder }) => [
  {
    field: 'name',
    sortable: true,
    rowGroup: true,
    hide: true,
    cellRenderer: 'iconCellRenderer',
  },
  {
    headerName: 'ID монеты',
    field: 'coinId',
    sortable: true,
    hide: true,
    aggFunc: 'last',
  },
  {
    headerName: 'Цена',
    field: 'actualPrice',
    sortable: true,
    cellRenderer: 'actualPriceCellRenderer',
    aggFunc: 'last',
    minWidth: 100,
  },
  {
    headerName: 'Ср. Цена покупки',
    field: 'price',
    sortable: true,
    cellRenderer: 'totalBuyCellRenderer',
    aggFunc: getPriceAvg,
    minWidth: 120,
  },
  {
    headerName: 'Количество',
    field: 'amount',
    sortable: true,
    aggFunc: 'sum',
    cellRenderer: 'amountCellRenderer',
    minWidth: 120,
  },
  {
    headerName: 'Вложил',
    field: 'totalBuy',
    sortable: true,
    aggFunc: 'sum',
    cellRenderer: 'totalBuyCellRenderer',
    minWidth: 120,
  },
  {
    headerName: 'Состояние',
    field: 'totalBuyActual',
    sortable: true,
    aggFunc: 'sum',
    cellRenderer: 'totalBuyCellRenderer',
    minWidth: 130,
  },
  {
    headerName: 'Прибыли (убытков)',
    field: 'totalProfit',
    sortable: true,
    aggFunc: 'sum',
    cellRenderer: 'priceCellRenderer',
    minWidth: 130,
  },
  {
    headerName: '% Прибыли (убытков)',
    field: 'totalProfitPercent',
    sortable: true,
    aggFunc: getProfitPercentAvg,
    cellRenderer: 'percentCellRenderer',
    minWidth: 130,
  },
  {
    headerName: 'Изменение',
    field: 'lastModified',
    sortable: true,
    cellRenderer: 'lastChangeCellRenderer',
    aggFunc: 'sum',
    minWidth: 130,
  },
  {
    headerName: '% Изменение',
    field: 'lastModifiedPercent',
    sortable: true,
    aggFunc: getlastModifiedPercentAvg,
    cellRenderer: 'percentCellRenderer',
    sort: 'desc',
    minWidth: 100,
  },
  {
    headerName: 'Место',
    field: 'place',
    sortable: true,
    aggFunc: getPlaceNames,
    minWidth: 100,
  },
  {
    headerName: 'Дата',
    field: 'date',
    sortable: true,
    aggFunc: 'last',
    minWidth: 100,
  },
  {
    headerName: 'Продать',
    field: 'priceToSell',
    sortable: true,
    aggFunc: getSellPrice,
    minWidth: 100,
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

export const autoGroupColumnDef = {
  field: 'name',
  headerName: 'Наименование',
  minWidth: 220,
  cellStyle: { fontWeight: 'bold', fontSize: '13px' },
};

export const groupDisplayType = 'singleColumn';
