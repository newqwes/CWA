import React from 'react';
import PropTypes from 'prop-types';
import { isEqual } from 'lodash/fp';
import { Button, Form as FormAntd, Input, Modal } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import {
  AUTH_MODAL_WIDTH,
  KEYWORD,
  AUTH_INPUT_RULE,
  AUTH_MADAL_NAME,
  AUTH_MADAL_TITLE,
  AUTH_FIELDS,
} from '../../constants/authModal';

import { Space, HeaderWrapper } from './styled';

class Header extends React.Component {
  static propTypes = {
    setAuthData: PropTypes.func.isRequired,
    setNotificationForm: PropTypes.func.isRequired,
    initialAuthData: PropTypes.object,
  };

  static defaultProps = {
    initialAuthData: {},
  };

  formRef = React.createRef();

  state = {
    modalVisible: false,
  };

  handleShow = () => {
    const { modalVisible } = this.state;

    this.setState({ modalVisible: !modalVisible });
  };

  handleKeyUp = ({ keyCode }) => {
    if (isEqual(keyCode, KEYWORD.enter)) {
      this.formRef.current.submit();
      this.handleShow();
    }
  };

  render() {
    const { modalVisible } = this.state;
    const { setAuthData, initialAuthData, setNotificationForm } = this.props;

    return (
      <HeaderWrapper>
        <Space>
          <Button onClick={this.handleShow} icon={<UserOutlined />} />
          <FormAntd
            name={AUTH_MADAL_NAME}
            initialValues={initialAuthData}
            onFinish={setAuthData}
            onKeyUp={this.handleKeyUp}
            ref={this.formRef}
            onFinishFailed={setNotificationForm}>
            <Modal
              title={AUTH_MADAL_TITLE}
              visible={modalVisible}
              width={AUTH_MODAL_WIDTH}
              onOk={this.handleShow}
              onCancel={this.handleShow}
              okButtonProps={{ htmlType: 'submit', form: AUTH_MADAL_NAME }}>
              <FormAntd.Item name={AUTH_FIELDS.username} rules={AUTH_INPUT_RULE}>
                <Input placeholder='почта' prefix={<UserOutlined />} />
              </FormAntd.Item>
              <FormAntd.Item name={AUTH_FIELDS.password} rules={AUTH_INPUT_RULE}>
                <Input.Password placeholder='пароль' prefix={<LockOutlined />} />
              </FormAntd.Item>
            </Modal>
          </FormAntd>
        </Space>
      </HeaderWrapper>
    );
  }
}

export default Header;
