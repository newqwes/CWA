import { connect } from 'react-redux';

import { getAuthorizationStatusAC } from '../actionCreators/auth';
import {
  handleCollapseSideMenuAC,
  setBankValueAC,
} from '../actionCreators/aplication';

import { isAuthorized } from '../selectors/authorization';
import {
  getDataRefreshLimitPerMinute,
  getLastDateUpdate,
  getScore,
} from '../selectors/user';
import { getCollapsedSideMenu, isLoading } from '../selectors/aplication';

import App from '../App.jsx';

const mapStateToProps = (state) => ({
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
  setBankValue: setBankValueAC,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
