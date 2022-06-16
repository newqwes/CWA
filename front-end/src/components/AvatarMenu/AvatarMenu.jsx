import React from 'react';
import PropTypes from 'prop-types';

import { DeleteOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { Dropdown, Menu, Avatar, Badge, Modal } from 'antd';

const { confirm } = Modal;

const AvatarMenu = ({ authLogout, logoutModalConfig, deleteUser, deleteUserModalConfig }) => {
  const showConfirmForLogout = () => {
    confirm({
      ...logoutModalConfig,
      onOk() {
        authLogout();
      },
    });
  };

  const showConfirmForDeleteUser = () => {
    confirm({
      ...deleteUserModalConfig,
      onOk() {
        deleteUser();
      },
    });
  };

  const menuItems = (
    <Menu>
      <Menu.Item key={0} onClick={showConfirmForDeleteUser} icon={<DeleteOutlined />} danger>
        Удалить аккаунт
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key={1} onClick={showConfirmForLogout} icon={<LogoutOutlined />}>
        Выйти
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menuItems} trigger={['click']}>
      <a onClick={e => e.preventDefault()}>
        <Badge dot>
          <Avatar icon={<UserOutlined />} />
        </Badge>
      </a>
    </Dropdown>
  );
};

export default AvatarMenu;

AvatarMenu.propTypes = {
  authLogout: PropTypes.func.isRequired,
  logoutModalConfig: PropTypes.object.isRequired,
  deleteUser: PropTypes.func.isRequired,
  deleteUserModalConfig: PropTypes.object.isRequired,
};
