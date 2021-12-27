import { connect } from 'react-redux';

import { getLastDateUpdate, getScore, getDataRefreshLimitPerMinute } from '../selectors/user';
import { isAuthorized } from '../selectors/authorization';

import { handleRefreshAC } from '../actionCreators/refresh';
import Header from '../components/Header';

const mapStateToProps = state => ({
  lastDateUpdate: getLastDateUpdate(state),
  score: getScore(state),
  dataRefreshLimitPerMinute: getDataRefreshLimitPerMinute(state),
  authorized: isAuthorized(state),
});

const mapDispatchToProps = {
  handleRefresh: handleRefreshAC,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
