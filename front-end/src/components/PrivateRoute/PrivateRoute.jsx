import React from 'react';
import PropTypes from 'prop-types';
import { Navigate, Routes, Route } from 'react-router-dom';

const PrivateRoute = ({ component: Component, authorized, ...props }) => (
  <Routes>
    <Route {...props} element={authorized ? <Component /> : <Navigate to='/' />} />
  </Routes>
);
export default PrivateRoute;

PrivateRoute.propTypes = {
  authorized: PropTypes.bool.isRequired,
  component: PropTypes.any.isRequired,
};
