import { connect } from 'react-redux';

import { getAuthorizationStatusAC } from '../actionCreators/auth';
import { handleCollapseSideMenuAC } from '../actionCreators/aplication';

import { isAuthorized } from '../selectors/authorization';
import { getLastDateUpdate, getScore, getDataRefreshLimitPerMinute } from '../selectors/user';
import { isLoading, getCollapsedSideMenu } from '../selectors/aplication';

import App from '../App.jsx';

const mapStateToProps = state => ({
  authorized: isAuthorized(state),
  loading: isLoading(state),
  collapsedSideMenu: getCollapsedSideMenu(state),
  lastDateUpdate: getLastDateUpdate(state),
  score: getScore(state),
  dataRefreshLimitPerMinute: getDataRefreshLimitPerMinute(state),
});

const mapDispatchToProps = {
  handleCollapseSideMenu: handleCollapseSideMenuAC,
  getAutharizationStatus: getAuthorizationStatusAC,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
