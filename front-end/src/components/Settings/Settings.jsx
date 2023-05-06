import React from 'react';
import { Button, Modal } from 'antd';
import PropTypes from 'prop-types';
import { DeleteOutlined } from '@ant-design/icons';

const Settings = ({ deleteUser }) => {
  const confirm = () => {
    Modal.confirm({
      title: 'Удалить аккаунт?',
      icon: <DeleteOutlined />,
      okText: 'Удалить',
      onOk: deleteUser,
      okType: 'danger',
      cancelText: 'Отмена',
    });
  };
  return (
    <Button onClick={confirm} danger>
      Удалить аккаунт
    </Button>
  );
};

Settings.propTypes = {
  deleteUser: PropTypes.func,
};

export default Settings;
