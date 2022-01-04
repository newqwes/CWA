import { getPriceAvg, getSellPrice } from '../../utils/aggFunc';

export const columnDefs = ({ deleteOrder }) => [
  {
    field: 'name',
    sortable: true,
    rowGroup: true,
    hide: true,
  },
  {
    headerName: 'Символ',
    field: 'symbol',
    sortable: true,
    aggFunc: 'last',
  },
  {
    headerName: 'Цена',
    field: 'actualPrice',
    sortable: true,
    cellRenderer: 'actualPriceCellRenderer',
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
    headerName: 'Общая прибыли (убытков)',
    field: 'totalProfit',
    sortable: true,
    aggFunc: 'sum',
    cellRenderer: 'priceCellRenderer',
  },
  {
    headerName: 'Ср. Цена',
    field: 'price',
    sortable: true,
    cellRenderer: 'totalBuyCellRenderer',
    aggFunc: getPriceAvg,
  },
  {
    headerName: 'Последнее изменение',
    field: 'lastModified',
    sortable: true,
    cellRenderer: 'lastChangeCellRenderer',
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
    aggFunc: getSellPrice,
  },
  {
    field: 'athlete',
    headerName: 'Уд.',
    cellRenderer: 'deleteButtonCellRenderer',
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
