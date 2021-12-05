import React from 'react';
import { isEqual, map } from 'lodash/fp';
import { Form as FormAntd, Input, Modal } from 'antd';

import { KEYWORD } from '../../../constants/keyword';

import authModalTypes from './propTypes';

import { GoogleOutlined } from './styled';

class AuthModal extends React.Component {
  static propTypes = authModalTypes;

  static defaultProps = {
    initialAuthData: {},
  };

  formRef = React.createRef();

  state = {
    authModalVisible: false,
    registrationModalVisible: false,
  };

  renderFormItems() {
    const { formItems } = this.props;

    const items = map(({ name, rules, placeholder, prefix, customInput }) => {
      const Field = customInput || Input;

      return (
        <FormAntd.Item name={name} rules={rules} key={name}>
          <Field placeholder={placeholder} prefix={prefix} />
        </FormAntd.Item>
      );
    }, formItems);

    return items;
  }

  handleKeyUp = ({ keyCode }) => {
    const { handleShow } = this.props;

    if (isEqual(keyCode, KEYWORD.enter)) {
      this.formRef.current.submit();
      handleShow();
    }
  };

  render() {
    const {
      modalName,
      initialValues,
      onFinish,
      setNotificationForm,
      title,
      visible,
      loading,
      width,
      handleShow,
      htmlType,
      okText,
      googleAuth,
      cancelText,
    } = this.props;

    const okButtonProps = { htmlType, form: modalName };

    return (
      <FormAntd
        name={modalName}
        initialValues={initialValues}
        onFinish={onFinish}
        onKeyUp={this.handleKeyUp}
        ref={this.formRef}
        onFinishFailed={setNotificationForm}>
        <Modal
          title={title}
          visible={visible}
          width={width}
          onCancel={handleShow}
          confirmLoading={loading}
          okText={okText}
          cancelText={cancelText}
          okButtonProps={okButtonProps}>
          {this.renderFormItems()}
          <GoogleOutlined type='dark' onClick={googleAuth} />
        </Modal>
      </FormAntd>
    );
  }
}

export default AuthModal;
