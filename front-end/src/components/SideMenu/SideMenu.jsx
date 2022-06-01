import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { map } from 'lodash/fp';
import { Menu } from 'antd';

import { MENU, DEFAULT_MODE_MENU } from '../../constants/menu';
import { DEFAULT_THEME } from '../../constants/theme';

const SideMenu = () => {
  const getMainMenu = () =>
    map(
      ({ link, title, icon }) => (
        <Menu.Item key={link} icon={icon}>
          <Link to={link}>{title}</Link>
        </Menu.Item>
      ),
      MENU,
    );

  const location = useLocation();

  return (
    <Menu theme={DEFAULT_THEME} selectedKeys={location.pathname} mode={DEFAULT_MODE_MENU}>
      {getMainMenu()}
    </Menu>
  );
};

export default SideMenu;
