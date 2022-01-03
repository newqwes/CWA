import { connect } from 'react-redux';

import Statistics from '../components/Statistics';
import { setOrderAC } from '../actionCreators/order';
import {
  getTotalInvested,
  getNetProfit,
  getWalletState,
  getLastModified,
  getTotalTransactionCount,
  getGridRowData,
  getChartData,
} from '../selectors/order';

const mapStateToProps = state => ({
  totalInvested: getTotalInvested(state),
  netProfit: getNetProfit(state),
  walletState: getWalletState(state),
  lastModified: getLastModified(state),
  totalTransactionCount: getTotalTransactionCount(state),
  rowData: getGridRowData(state),
  chartData: getChartData(state),
});

const mapDispatchToProps = {
  setOrder: setOrderAC,
};

export default connect(mapStateToProps, mapDispatchToProps)(Statistics);
