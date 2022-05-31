import { connect } from 'react-redux';
import { compose } from 'redux';
import { withAuthRedirect } from '../hoc/withAuthRedirect';

import Statistics from '../components/Statistics';
import { deleteOrderAC, setOrderAC, setOrdersAC } from '../actionCreators/order';
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

const mapStateToProps = state => ({
  totalInvested: getTotalInvested(state),
  netProfit: getNetProfit(state),
  walletState: getWalletState(state),
  lastModified: getLastModified(state),
  totalTransactionCount: getTotalTransactionCount(state),
  rowData: getGridRowData(state),
  chartData: getChartData(state),
  edgeCoins: getEdgeCoins(state),
});

const mapDispatchToProps = {
  setOrder: setOrderAC,
  setOrders: setOrdersAC,
  deleteOrder: deleteOrderAC,
};

export default compose(connect(mapStateToProps, mapDispatchToProps), withAuthRedirect)(Statistics);
