import React from 'react';
import PropTypes from 'prop-types';
import { map } from 'lodash/fp';

import AuthModal from './AuthModal';
import AuthButtons from './AuthButtons';

import { Space } from './styled';

class AuthComponent extends React.Component {
  static propTypes = {
    modalsConfig: PropTypes.array.isRequired,
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
      ({ modalName, initialValues, onFinish, title, visible, handleShow, formItems }) => (
        <AuthModal
          key={modalName}
          loading={loading}
          setNotificationForm={setNotificationForm}
          modalName={modalName}
          initialValues={initialValues}
          onFinish={onFinish}
          title={title}
          visible={visible}
          handleShow={handleShow}
          formItems={formItems}
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
