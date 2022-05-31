import React from 'react';
import PropTypes from 'prop-types';

import { UserNameWrapper } from './styled';

const Title = ({ userName }) => (
  <span>
    Добро пожаловать
    {userName && <UserNameWrapper> {userName}</UserNameWrapper>} в Crypto Wallet Analytics
  </span>
);

export default Title;

Title.propTypes = {
  userName: PropTypes.string,
};
