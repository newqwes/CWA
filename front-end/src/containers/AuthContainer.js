import { connect } from 'react-redux';

import { authPending } from '../actionCreators/auth';
import {
  setNotificationForm,
  handleShowAuthModal,
  handleShowRegistrationModal,
} from '../actionCreators/aplication';
import { authFormItems, initialAuthData } from '../configuration/authConfig';

import { isLoading, isAuthModalVisible, isRegistrationModalVisible } from '../selectors/aplication';
import { isAuthorized } from '../selectors/authorization';

import AuthComponent from '../components/AuthComponent';

const mapStateToProps = state => ({
  authorized: isAuthorized(state),
  loading: isLoading(state),
  authModalVisible: isAuthModalVisible(state),
  registrationModalVisible: isRegistrationModalVisible(state),

  // configuration
  authFormItems,
  initialAuthData,
});

const mapDispatchToProps = {
  setAuthData: authPending,
  setNotificationForm,
  handleShowAuthModal,
  handleShowRegistrationModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthComponent);
