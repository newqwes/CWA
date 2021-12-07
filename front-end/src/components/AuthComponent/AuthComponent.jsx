import React from 'react';
import PropTypes from 'prop-types';

import { MADALS_NAME } from '../../constants/modal';
import { AUTH_MADAL_TITLE } from '../../constants/authModal';

import AuthModal from './AuthModal';
import AuthButtons from './AuthButtons';

import { Space } from './styled';

class AuthComponent extends React.Component {
  static propTypes = {
    setAuthData: PropTypes.func.isRequired,
    setNotificationForm: PropTypes.func.isRequired,
    handleShowAuthModal: PropTypes.func.isRequired,
    handleShowRegistrationModal: PropTypes.func.isRequired,
    initialAuthData: PropTypes.object,
    loading: PropTypes.bool.isRequired,
    authModalVisible: PropTypes.bool.isRequired,
    registrationModalVisible: PropTypes.bool.isRequired,
    authFormItems: PropTypes.array.isRequired,
  };

  static defaultProps = {
    initialAuthData: {},
  };

  render() {
    const {
      handleShowAuthModal,
      handleShowRegistrationModal,
      setAuthData,
      initialAuthData,
      setNotificationForm,
      loading,
      authModalVisible,
      authFormItems,
    } = this.props;

    return (
      <Space>
        <AuthButtons
          handleShowAuthModal={handleShowAuthModal}
          handleShowRegistrationModal={handleShowRegistrationModal}
        />
        <AuthModal
          modalName={MADALS_NAME.authModal}
          initialValues={initialAuthData}
          onFinish={setAuthData}
          setNotificationForm={setNotificationForm}
          title={AUTH_MADAL_TITLE}
          visible={authModalVisible}
          handleShow={handleShowAuthModal}
          formItems={authFormItems}
          loading={loading}
        />
      </Space>
    );
  }
}

export default AuthComponent;
