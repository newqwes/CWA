import React from 'react';
import PropTypes from 'prop-types';
import { map } from 'lodash/fp';

import AuthModal from './AuthModal';
import AuthButtons from './AuthButtons';

import { Space } from './styled';

class AuthComponent extends React.Component {
  static propTypes = {
    modalsConfig: PropTypes.arrayOf(PropTypes.object).isRequired,
    handleShowRegistrationModal: PropTypes.func.isRequired,
    handleShowAuthModal: PropTypes.func.isRequired,
    setNotificationForm: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    initialAuthData: {},
  };

  authModals() {
    const { modalsConfig, loading, setNotificationForm } = this.props;

    return map(
      config => (
        <AuthModal
          key={config.modalName}
          loading={loading}
          setNotificationForm={setNotificationForm}
          {...config}
        />
      ),
      modalsConfig,
    );
  }

  render() {
    const { handleShowAuthModal, handleShowRegistrationModal } = this.props;

    return (
      <Space>
        <AuthButtons
          handleShowAuthModal={handleShowAuthModal}
          handleShowRegistrationModal={handleShowRegistrationModal}
        />
        {this.authModals()}
      </Space>
    );
  }
}

export default AuthComponent;
