import React, { useEffect } from 'react';

const LoginSuccess = () => {
  useEffect(() => {
    setTimeout(() => {
      window.close();
    }, 100000);
  }, []);

  return <div>Успешно авторизованы!</div>;
};

export default LoginSuccess;
