import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Space } from 'antd';

const { confirm } = Modal;

const Logout = ({ authLogout, modalConfig }) => {
  function showConfirm() {
    confirm({
      ...modalConfig,
      onOk() {
        authLogout();
      },
    });
  }

  return (
    <Space>
      <Button onClick={showConfirm} ghost>
        {modalConfig.buttonText}
      </Button>
    </Space>
  );
};

Logout.propTypes = {
  authLogout: PropTypes.func.isRequired,
  modalConfig: PropTypes.object.isRequired,
};

export default Logout;
