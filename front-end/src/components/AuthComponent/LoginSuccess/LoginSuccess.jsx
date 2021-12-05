import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const LoginSuccess = ({ userName }) => {
  useEffect(() => {
    setTimeout(() => {
      window.close();
    }, 1000);
  }, []);

  return <h2>{userName} успешно авторизованы!</h2>;
};

LoginSuccess.propTypes = {
  userName: PropTypes.string.isRequired,
};

export default LoginSuccess;
