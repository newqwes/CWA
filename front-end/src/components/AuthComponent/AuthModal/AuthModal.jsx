import React from 'react';
import { isEqual, map } from 'lodash/fp';
import { Form as FormAntd, Input, Modal } from 'antd';

import { KEYWORD } from '../../../constants/keyword';
import { HTML_TYPE, MODAL_WIDTH } from '../../../constants/modal';

import propTypes from './propTypes';

class AuthModal extends React.Component {
  static propTypes = propTypes;

  static defaultProps = {
    initialAuthData: {},
    htmlType: HTML_TYPE,
    width: MODAL_WIDTH,
  };

  formRef = React.createRef();

  state = {
    authModalVisible: false,
    registrationModalVisible: false,
  };

  renderFormItems() {
    const { formItems } = this.props;

    const items = map(
      ({ name, rules, placeholder, prefix }) => (
        <FormAntd.Item name={name} rules={rules} key={name}>
          <Input placeholder={placeholder} prefix={prefix} />
        </FormAntd.Item>
      ),
      formItems,
    );

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
          okButtonProps={okButtonProps}>
          {this.renderFormItems()}
        </Modal>
      </FormAntd>
    );
  }
}

export default AuthModal;
