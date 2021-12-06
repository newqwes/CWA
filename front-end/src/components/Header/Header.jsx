import React from 'react';
import PropTypes from 'prop-types';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import { MADALS_NAME } from '../../constants/modal';
import { AUTH_INPUT_RULE, AUTH_MADAL_TITLE, AUTH_FIELDS } from '../../constants/authModal';

import AuthModal from '../AuthModal';
import AuthButtons from './AuthButtons';

import { Space, HeaderWrapper } from './styled';

class Header extends React.Component {
  static propTypes = {
    setAuthData: PropTypes.func.isRequired,
    setNotificationForm: PropTypes.func.isRequired,
    initialAuthData: PropTypes.object,
    loading: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    initialAuthData: {},
  };

  state = {
    authModalVisible: false,
    registrationModalVisible: false,
  };

  handleShowAuth = () => {
    const { authModalVisible } = this.state;

    this.setState({ authModalVisible: !authModalVisible });
  };

  handleShowRegistration = () => {
    const { registrationModalVisible } = this.state;

    this.setState({ registrationModalVisible: !registrationModalVisible });
  };

  render() {
    const { authModalVisible } = this.state;
    const { setAuthData, initialAuthData, setNotificationForm, loading } = this.props;

    const authFormItems = [
      {
        name: AUTH_FIELDS.username,
        rules: AUTH_INPUT_RULE,
        placeholder: 'почта',
        prefix: <UserOutlined />,
      },
      {
        name: AUTH_FIELDS.password,
        rules: AUTH_INPUT_RULE,
        placeholder: 'пароль',
        prefix: <LockOutlined />,
      },
    ];

    return (
      <HeaderWrapper>
        <Space>
          <AuthButtons
            handleShowAuth={this.handleShowAuth}
            handleShowRegistration={this.handleShowRegistration}
          />
          <AuthModal
            modalName={MADALS_NAME.authModal}
            initialValues={initialAuthData}
            onFinish={setAuthData}
            setNotificationForm={setNotificationForm}
            title={AUTH_MADAL_TITLE}
            visible={authModalVisible}
            handleShow={this.handleShowAuth}
            formItems={authFormItems}
            loading={loading}
          />
        </Space>
      </HeaderWrapper>
    );
  }
}

export default Header;
