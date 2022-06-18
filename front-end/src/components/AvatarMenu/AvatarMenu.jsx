import React from 'react';
import { map } from 'lodash/fp';
import PropTypes from 'prop-types';

import { UserOutlined } from '@ant-design/icons';
import { Dropdown, Menu, Avatar, Badge } from 'antd';

const AvatarMenu = ({ menuItems }) => {
  const renderMenuItems = (
    <Menu>
      {map(
        ({ key, onClick, icon, text, danger }) => (
          <Menu.Item key={key} onClick={onClick} icon={icon} danger={danger}>
            {text}
          </Menu.Item>
        ),
        menuItems,
      )}
    </Menu>
  );

  return (
    <Dropdown overlay={renderMenuItems} trigger={['click']}>
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
  menuItems: PropTypes.object.isRequired,
};
