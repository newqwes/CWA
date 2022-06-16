import { connect } from 'react-redux';

import { deleteUserAC } from '../actionCreators/user';
import { authLogoutAC } from '../actionCreators/auth';

import AvatarMenu from '../components/AvatarMenu';

import { deleteUserModalConfig } from '../configuration/deleteUserConfig';
import { logoutModalConfig } from '../configuration/authConfig';

const mapDispatchToProps = {
  deleteUser: deleteUserAC,
  authLogout: authLogoutAC,
};

const mergeProps = (_, { authLogout, deleteUser }, ownProps) => ({
  ...ownProps,
  authLogout,
  deleteUser,
  deleteUserModalConfig,
  logoutModalConfig,
});

export default connect(null, mapDispatchToProps, mergeProps)(AvatarMenu);
