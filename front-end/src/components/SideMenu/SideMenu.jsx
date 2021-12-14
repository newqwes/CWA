import React from 'react';
import PropTypes from 'prop-types';
import { map } from 'lodash/fp';
import { Menu } from 'antd';

import { DEFAULT_THEME } from '../../constants/theme';
import { DEFAULT_MODE_MENU, DEFAULT_SELECTED_MENU } from '../../constants/menu';

const SideMenu = ({ menuItems }) => {
  const handleOnSelect = ({ key }) => {
    console.log(key);
  };

  const getMainMenu = () =>
    map(
      ({ key, title, icon }) => (
        <Menu.Item key={key} icon={icon}>
          {title}
        </Menu.Item>
      ),
      menuItems,
    );

  return (
    <Menu
      onSelect={handleOnSelect}
      theme={DEFAULT_THEME}
      defaultSelectedKeys={DEFAULT_SELECTED_MENU}
      mode={DEFAULT_MODE_MENU}>
      {getMainMenu()}
    </Menu>
  );
};

SideMenu.propTypes = {
  menuItems: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default SideMenu;
