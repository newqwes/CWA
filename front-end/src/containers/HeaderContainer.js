import { connect } from 'react-redux';

import { authPending } from '../actionCreators/auth';

import { getLoading } from '../selectors/aplication';
import { getAuthStatus } from '../selectors/authorization';

import Header from '../components/Header';

const mapStateToProps = state => ({
  authorized: getAuthStatus(state),
  loading: getLoading(state),
});

const mapDispatchToProps = {
  setAuthData: authPending,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
