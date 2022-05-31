import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { map } from 'lodash/fp';
import { Menu } from 'antd';

import { MENU, DEFAULT_MODE_MENU } from '../../constants/menu';
import { DEFAULT_THEME } from '../../constants/theme';

const SideMenu = ({ location }) => {
  const getMainMenu = () =>
    map(
      ({ link, title, icon }) => (
        <Menu.Item key={link} icon={icon}>
          <Link to={link}>{title}</Link>
        </Menu.Item>
      ),
      MENU,
    );

  return (
    <Menu theme={DEFAULT_THEME} selectedKeys={location.pathname} mode={DEFAULT_MODE_MENU}>
      {getMainMenu()}
    </Menu>
  );
};

SideMenu.propTypes = {
  location: PropTypes.object.isRequired,
};

export default SideMenu;
