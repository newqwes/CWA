import React, { useRef } from 'react';
import { isEqual, map } from 'lodash/fp';
import { Form as FormAntd, Input, Modal } from 'antd';

import { KEYWORD } from '../../../constants/keyword';

import authModalTypes from './propTypes';
import GoogleAuth from '../../Buttons/GoogleAuth';

const AuthModal = ({
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
  formItems,
}) => {
  const formRef = useRef();

  const renderFormItems = () => {
    const items = map(({ name, rules, placeholder, prefix, customInput }) => {
      const Field = customInput || Input;

      return (
        <FormAntd.Item name={name} rules={rules} key={name}>
          <Field placeholder={placeholder} prefix={prefix} />
        </FormAntd.Item>
      );
    }, formItems);

    return items;
  };

  const handleKeyUp = ({ keyCode }) => {
    if (isEqual(keyCode, KEYWORD.enter)) {
      formRef.current.submit();
      handleShow();
    }
  };

  return (
    <FormAntd
      name={modalName}
      initialValues={initialValues}
      onFinish={onFinish}
      onKeyUp={handleKeyUp}
      ref={formRef}
      onFinishFailed={setNotificationForm}
    >
      <Modal
        title={title}
        visible={visible}
        width={width}
        onCancel={handleShow}
        confirmLoading={loading}
        okText={okText}
        cancelText={cancelText}
        okButtonProps={{ htmlType, form: modalName }}
      >
        {renderFormItems()}
        <GoogleAuth handleClick={googleAuth} />
      </Modal>
    </FormAntd>
  );
};

AuthModal.propTypes = authModalTypes;

AuthModal.defaultProps = {
  initialAuthData: {},
};

export default AuthModal;
