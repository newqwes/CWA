import React from 'react';
import PropTypes from 'prop-types';

import { Google } from '../../Icons';

import { Wrapper, IconWrapper, Title } from './styled';

const GoogleAuth = ({ handleClick }) => (
  <Wrapper onClick={handleClick}>
    <IconWrapper>
      <Google />
    </IconWrapper>
    <Title level={4}>Войти</Title>
  </Wrapper>
);

GoogleAuth.propTypes = {
  handleClick: PropTypes.func.isRequired,
};

export default GoogleAuth;
