import { connect } from 'react-redux';

import { handleCollapseSideMenu } from '../actionCreators/aplication';

import { isLoading, getCollapsedSideMenu } from '../selectors/aplication';
import { isAuthorized } from '../selectors/authorization';

import App from '../App.jsx';

const mapStateToProps = state => ({
  authorized: isAuthorized(state),
  loading: isLoading(state),
  collapsedSideMenu: getCollapsedSideMenu(state),
});

const mapDispatchToProps = {
  handleCollapseSideMenu,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
