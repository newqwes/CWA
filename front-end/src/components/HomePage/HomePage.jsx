import React from 'react';
import PropTypes from 'prop-types';

import { Button, Result } from 'antd';
import { SketchOutlined } from '@ant-design/icons';

const HomePage = ({ handleShowAuthModal, authorized }) => (
  <Result
    icon={<SketchOutlined />}
    title='Добро Пожаловать в Coinlitics!'
    subTitle={
      !authorized
        ? 'Для того чтобы начать, войдите или зарегистриуруйтесь, пожалуйста'
        : 'Теперь вы можете начать пользоваться'
    }
    extra={
      !authorized ? (
        <Button onClick={handleShowAuthModal} type='primary'>
          Войти
        </Button>
      ) : null
    }
  />
);

export default HomePage;

HomePage.propTypes = {
  handleShowAuthModal: PropTypes.object.isRequired,
  authorized: PropTypes.bool.isRequired,
};
