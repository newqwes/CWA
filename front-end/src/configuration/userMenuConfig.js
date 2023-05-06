import React from 'react';
import { LogoutOutlined, ToolOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import { Link } from 'react-router-dom';
import { logoutModalConfig } from './authConfig';

const { confirm } = Modal;
export const userMenuConfig = {
  edit: {
    key: 0,
    icon: <ToolOutlined />,
    text: 'Настройки',
    component: Link,
    to: '/settings',
  },
  logout: {
    key: 2,
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
