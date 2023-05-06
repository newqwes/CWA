import { connect } from 'react-redux';
import { authLogoutAC } from '../actionCreators/auth';
import { userMenuConfig } from '../configuration/userMenuConfig';

import AvatarMenu from '../components/AvatarMenu';
import { getAvatarURL, getEmail, getLogin } from '../selectors/user';

const mapStateToProps = (state) => ({
  avatarURL: getAvatarURL(state),
  login: getLogin(state),
  email: getEmail(state),
});

const mapDispatchToProps = {
  authLogout: authLogoutAC,
};

const mergeProps = (mapState, { authLogout }) =>
   ({
    ...mapState,
    menuItems: [
      userMenuConfig.edit,
    {
      ...userMenuConfig.logout,
      onClick: userMenuConfig.logout.onClickFactory(authLogout),
    },
],
});
export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(AvatarMenu);
