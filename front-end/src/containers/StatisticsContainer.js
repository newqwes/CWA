import { connect } from 'react-redux';

import Statistics from '../components/Statistics';
import {
  deleteOrderAC,
  getBackupOrdersAC,
  setOrderAC,
  setOrdersAC,
  setNewPlaceAC,
  getUserPlaceListAC,
} from '../actionCreators/order';
import {
  getTotalInvested,
  getNetProfit,
  getWalletState,
  getLastModified,
  getTotalTransactionCount,
  getGridRowData,
  getChartData,
  getEdgeCoins,
} from '../selectors/order';
import { getPlaceList } from '../selectors/user';

const mapStateToProps = state => ({
  totalInvested: getTotalInvested(state),
  netProfit: getNetProfit(state),
  walletState: getWalletState(state),
  lastModified: getLastModified(state),
  totalTransactionCount: getTotalTransactionCount(state),
  rowData: getGridRowData(state),
  chartData: getChartData(state),
  edgeCoins: getEdgeCoins(state),
  placeList: getPlaceList(state),
});

const mapDispatchToProps = {
  setOrder: setOrderAC,
  setOrders: setOrdersAC,
  deleteOrder: deleteOrderAC,
  getBackupOrders: getBackupOrdersAC,
  setNewPlace: setNewPlaceAC,
  getUserPlaceList: getUserPlaceListAC,
};

export default connect(mapStateToProps, mapDispatchToProps)(Statistics);
