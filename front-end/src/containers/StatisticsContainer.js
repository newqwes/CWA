import { connect } from 'react-redux';

import { getLastDateUpdate, getScore, getDataRefreshLimitPerMinute } from '../selectors/user';
import { handleRefreshAC } from '../actionCreators/refresh';
import Statistics from '../components/Statistics';

const mapStateToProps = state => ({
  lastDateUpdate: getLastDateUpdate(state),
  score: getScore(state),
  dataRefreshLimitPerMinute: getDataRefreshLimitPerMinute(state),
});

const mapDispatchToProps = {
  handleRefresh: handleRefreshAC,
};

export default connect(mapStateToProps, mapDispatchToProps)(Statistics);
