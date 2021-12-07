import React from 'react';
import PropTypes from 'prop-types';

import { HeaderWrapper } from './styled';

const Header = ({ children }) => <HeaderWrapper>{children}</HeaderWrapper>;

Header.propTypes = { children: PropTypes.element.isRequired };

export default Header;
