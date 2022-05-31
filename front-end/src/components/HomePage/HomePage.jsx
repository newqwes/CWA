import React from 'react';
import PropTypes from 'prop-types';

import { Button, Result } from 'antd';
import { SketchOutlined } from '@ant-design/icons';

const HomePage = ({ handleShowAuthModal, handleShowRegistrationModal, authorized }) => (
  <Result
    icon={<SketchOutlined />}
    title='Добро пожаловать в Coinlitics.ru'
    subTitle={
      authorized
        ? 'Сервис находится на стадии разработки, пока доступна возожность просмотра статистики по криптокошельку'
        : 'Для того чтобы начать, войдите или зарегистриуруйтесь, пожалуйста'
    }
    extra={
      authorized ? null : (
        <>
          <Button onClick={handleShowAuthModal} type='primary'>
            Войти
          </Button>
          <Button onClick={handleShowRegistrationModal} type='default'>
            Регистрация
          </Button>
        </>
      )
    }
  />
);

export default HomePage;

HomePage.propTypes = {
  handleShowAuthModal: PropTypes.func.isRequired,
  handleShowRegistrationModal: PropTypes.func.isRequired,
  authorized: PropTypes.bool.isRequired,
};
