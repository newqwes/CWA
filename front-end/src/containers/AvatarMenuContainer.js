import { connect } from 'react-redux';

import { deleteUserAC } from '../actionCreators/user';
import { authLogoutAC } from '../actionCreators/auth';
import { userMenuConfig } from '../configuration/userMenuConfig';

import AvatarMenu from '../components/AvatarMenu';

const mapDispatchToProps = {
  deleteUser: deleteUserAC,
  authLogout: authLogoutAC,
};

const mergeProps = (_, { deleteUser, authLogout }) => ({
  menuItems: [
    { ...userMenuConfig.delete, onClick: userMenuConfig.delete.onClickFactory(deleteUser) },
    { ...userMenuConfig.logout, onClick: userMenuConfig.logout.onClickFactory(authLogout) },
  ],
});

export default connect(null, mapDispatchToProps, mergeProps)(AvatarMenu);
