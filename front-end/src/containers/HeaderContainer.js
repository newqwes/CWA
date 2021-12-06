import { connect } from 'react-redux';

import { authPending } from '../actionCreators/auth';

import Header from '../components/Header';
import { getAuthStatus } from '../selectors/authorization';

const mapStateToProps = state => ({
  authorized: getAuthStatus(state),
});

const mapDispatchToProps = {
  setAuthData: authPending,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
