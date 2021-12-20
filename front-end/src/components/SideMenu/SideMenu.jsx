import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { map } from 'lodash/fp';
import { Menu } from 'antd';

import { DEFAULT_THEME } from '../../constants/theme';
import { DEFAULT_MODE_MENU } from '../../constants/menu';

const SideMenu = ({ menuItems, location }) => {
  const getMainMenu = () =>
    map(
      ({ link, title, icon }) => (
        <Menu.Item key={link} icon={icon}>
          <Link to={link}>{title}</Link>
        </Menu.Item>
      ),
      menuItems,
    );

  return (
    <Menu theme={DEFAULT_THEME} selectedKeys={location.pathname} mode={DEFAULT_MODE_MENU}>
      {getMainMenu()}
    </Menu>
  );
};

SideMenu.propTypes = {
  menuItems: PropTypes.arrayOf(PropTypes.object).isRequired,
  location: PropTypes.object.isRequired,
};

export default SideMenu;
