import { connect } from 'react-redux';

import { authPendingAC, googleAuthPendingAC, registrationPendingAC } from '../actionCreators/auth';
import {
  setNotificationFormAC,
  handleShowAuthModalAC,
  handleShowRegistrationModalAC,
} from '../actionCreators/aplication';
import { authModalConfig, registrationModalConfig } from '../configuration/authConfig';

import { isLoading, isAuthModalVisible, isRegistrationModalVisible } from '../selectors/aplication';
import { isAuthorized } from '../selectors/authorization';

import AuthComponent from '../components/AuthComponent';

const mapStateToProps = state => ({
  authorized: isAuthorized(state),
  loading: isLoading(state),
  authModalVisible: isAuthModalVisible(state),
  registrationModalVisible: isRegistrationModalVisible(state),
});

const mapDispatchToProps = {
  setAuthData: authPendingAC,
  googleAuth: googleAuthPendingAC,
  setRegistrationData: registrationPendingAC,
  setNotificationForm: setNotificationFormAC,
  handleShowAuthModal: handleShowAuthModalAC,
  handleShowRegistrationModal: handleShowRegistrationModalAC,
};

const mergeProps = (
  { authModalVisible, registrationModalVisible, loading },
  {
    setAuthData,
    setRegistrationData,
    handleShowAuthModal,
    handleShowRegistrationModal,
    setNotificationForm,
    googleAuth,
  },
  ownProps,
) => {
  const modalsConfig = [
    {
      ...authModalConfig,
      googleAuth,
      onFinish: setAuthData,
      visible: authModalVisible,
      handleShow: handleShowAuthModal,
    },
    {
      ...registrationModalConfig,
      googleAuth,
      onFinish: setRegistrationData,
      visible: registrationModalVisible,
      handleShow: handleShowRegistrationModal,
    },
  ];

  return {
    ...ownProps,
    modalsConfig,
    loading,
    setNotificationForm,
    handleShowAuthModal,
    handleShowRegistrationModal,
  };
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(AuthComponent);
