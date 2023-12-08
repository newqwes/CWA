import { connect } from 'react-redux';

import Statistics from '../components/Statistics';
import {
  deleteOrderAC,
  getBackupOrdersAC,
  getUserPlaceListAC,
  handleCoinHoldPlaceAC,
  setNewPlaceAC,
  setOrderAC,
  setOrdersAC,
} from '../actionCreators/order';
import {
  getChartData,
  getCoinHoldPlace,
  getCoinHoldPlaceOptions,
  getEdgeCoins,
  getGridRowData,
  getLastModified,
  getNetProfit,
  getTotalInvested,
  getTotalTransactionCount,
  getWalletState,
} from '../selectors/order';
import { getPlaceList } from '../selectors/user';

const mapStateToProps = (state) => ({
  totalInvested: getTotalInvested(state),
  netProfit: getNetProfit(state),
  walletState: getWalletState(state),
  lastModified: getLastModified(state),
  totalTransactionCount: getTotalTransactionCount(state),
  rowData: getGridRowData(state),
  chartData: getChartData(state),
  edgeCoins: getEdgeCoins(state),
  placeList: getPlaceList(state),
  coinHoldPlaceOptions: getCoinHoldPlaceOptions(state),
  coinHoldPlace: getCoinHoldPlace(state),
});

const mapDispatchToProps = {
  setOrder: setOrderAC,
  setOrders: setOrdersAC,
  deleteOrder: deleteOrderAC,
  getBackupOrders: getBackupOrdersAC,
  setNewPlace: setNewPlaceAC,
  getUserPlaceList: getUserPlaceListAC,
  handleCoinHoldPlace: handleCoinHoldPlaceAC,
};

export default connect(mapStateToProps, mapDispatchToProps)(Statistics);
