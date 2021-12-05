import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';

import { Wrapper } from './styled';

const AuthButtons = ({ handleShowAuthModal, handleShowRegistrationModal }) => (
  <Wrapper>
    <Button onClick={handleShowAuthModal} type='link' size='large'>
      Вход
    </Button>
    <Button onClick={handleShowRegistrationModal} ghost>
      Регистрация
    </Button>
  </Wrapper>
);

AuthButtons.propTypes = {
  handleShowAuthModal: PropTypes.func.isRequired,
  handleShowRegistrationModal: PropTypes.func.isRequired,
};

export default AuthButtons;
