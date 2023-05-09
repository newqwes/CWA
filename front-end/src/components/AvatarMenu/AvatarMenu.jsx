import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Dropdown, Menu } from 'antd';
import {
  ProfileContainer,
  ProfileDescription,
  ProfileTextBlock,
  ProfileTitle,
} from './styled';

const AvatarMenu = ({ menuItems, avatarURL, login, email }) => {
  const [visible, setVisible] = useState(false);

  const renderMenuItems = (
    <Menu onClick={() => setVisible(false)}>
      <ProfileContainer
        onClick={() => setVisible(false)}
        to={`/profile/${login}`}
      >
        {avatarURL ? (
          <Avatar src={avatarURL} />
        ) : (
          <Avatar icon={<UserOutlined />} />
        )}
        <ProfileTextBlock>
          <ProfileTitle>{`Привет, ${login}`}</ProfileTitle>
          <ProfileDescription>{email}</ProfileDescription>
        </ProfileTextBlock>
      </ProfileContainer>
      {menuItems.map(({ key, onClick, icon, text, component, to }) => {
        if (component) {
          return (
            <Menu.Item key={key} icon={icon}>
              {React.createElement(component, { to }, text)}
            </Menu.Item>
          );
        }
        // В противном случае, используем onClick и icon как раньше
        return (
          <Menu.Item key={key} onClick={onClick} icon={icon}>
            {text}
          </Menu.Item>
        );
      })}
    </Menu>
  );

  return (
    <Dropdown
      overlay={renderMenuItems}
      visible={visible}
      onVisibleChange={setVisible}
      trigger={['hover']}
    >
      <a onClick={(e) => e.preventDefault()}>
        {avatarURL ? (
          <Avatar src={avatarURL} />
        ) : (
          <Avatar icon={<UserOutlined />} />
        )}
      </a>
    </Dropdown>
  );
};

export default AvatarMenu;

AvatarMenu.propTypes = {
  menuItems: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.number.isRequired,
      onClick: PropTypes.func,
      icon: PropTypes.node,
      text: PropTypes.string.isRequired,
      component: PropTypes.elementType,
      to: PropTypes.string,
    }),
  ).isRequired,
  login: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  avatarURL: PropTypes.string,
};
