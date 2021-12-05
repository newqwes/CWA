import React from 'react';
import { map } from 'lodash/fp';
import { Menu } from 'antd';

import { DEFAULT_THEME } from '../../constants/theme';
import { DEFAULT_MODE_MENU, DEFAULT_SELECTED_MENU, MENU } from '../../constants/menu';

const SideMenu = () => {
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
      MENU,
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

export default SideMenu;
