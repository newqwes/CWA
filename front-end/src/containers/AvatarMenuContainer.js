import { connect } from 'react-redux';

import { deleteUserDataAC } from '../actionCreators/user';
import { authLogoutAC } from '../actionCreators/auth';

import AvatarMenu from '../components/AvatarMenu';

import { deleteUserDataModalConfig } from '../configuration/deleteDataConfig';
import { logoutModalConfig } from '../configuration/authConfig';

const mapDispatchToProps = {
  deleteUserData: deleteUserDataAC,
  authLogout: authLogoutAC,
};

const mergeProps = (_, { authLogout, deleteUserData }, ownProps) => ({
  ...ownProps,
  authLogout,
  deleteUserData,
  deleteUserDataModalConfig,
  logoutModalConfig,
});

export default connect(null, mapDispatchToProps, mergeProps)(AvatarMenu);
