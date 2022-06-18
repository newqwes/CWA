import React from 'react';
import { DeleteOutlined, LogoutOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Modal } from 'antd';

import { MADAL_BUTTONS } from '../constants/modal';
import { logoutModalConfig } from './authConfig';

const { confirm } = Modal;

const deleteUserModalConfig = {
  title: 'Вы действительно хотите удалить аккаунт?',
  okType: 'danger',
  okText: MADAL_BUTTONS.yes,
  cancelText: MADAL_BUTTONS.no,
  icon: <ExclamationCircleOutlined />,
};

export const userMenuConfig = {
  delete: {
    key: 0,
    onClickFactory: onOk => () => {
      confirm({
        ...deleteUserModalConfig,
        onOk: () => {
          onOk();
        },
      });
    },
    icon: <DeleteOutlined />,
    text: 'Удалить аккаунт',
    danger: true,
  },
  logout: {
    key: 1,
    onClickFactory: onOk => () => {
      confirm({
        ...logoutModalConfig,
        onOk: () => {
          onOk();
        },
      });
    },
    icon: <LogoutOutlined />,
    text: 'Выйти',
  },
};
