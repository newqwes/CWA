import { connect } from 'react-redux';

import { authLogoutAC } from '../actionCreators/auth';

import Logout from '../components/Logout';

import { logoutModalConfig } from '../configuration/authConfig';

const mapDispatchToProps = {
  authLogout: authLogoutAC,
};

const mergeProps = (_, { authLogout }, ownProps) => ({
  ...ownProps,
  authLogout,
  modalConfig: logoutModalConfig,
});

export default connect(null, mapDispatchToProps, mergeProps)(Logout);
