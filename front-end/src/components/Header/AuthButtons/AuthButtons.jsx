import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';

import { Wrapper } from './styled';

const AuthButtons = ({ handleShowAuth, handleShowRegistration }) => (
  <Wrapper>
    <Button onClick={handleShowAuth} type='link' size='large'>
      Вход
    </Button>
    <Button onClick={handleShowRegistration} ghost>
      Регистрация
    </Button>
  </Wrapper>
);

AuthButtons.propTypes = {
  handleShowAuth: PropTypes.func.isRequired,
  handleShowRegistration: PropTypes.func.isRequired,
};

export default AuthButtons;
