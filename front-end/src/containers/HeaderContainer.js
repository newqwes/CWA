import { connect } from 'react-redux';

import {
  getDataRefreshLimitPerMinute,
  getLastDateUpdate,
  getScore,
  getUserId,
} from '../selectors/user';
import { isNotOrderList } from '../selectors/order';
import { isAuthorized } from '../selectors/authorization';
import { getBankValue } from '../selectors/aplication';

import { handleRefreshAC } from '../actionCreators/refresh';
import Header from '../components/Header';

const mapStateToProps = (state) => ({
  lastDateUpdate: getLastDateUpdate(state),
  score: getScore(state),
  userId: getUserId(state),
  noData: isNotOrderList(state),
  dataRefreshLimitPerMinute: getDataRefreshLimitPerMinute(state),
  authorized: isAuthorized(state),
  bank: getBankValue(state),
});

const mapDispatchToProps = {
  handleRefresh: handleRefreshAC,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
