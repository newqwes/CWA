import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({ component: Component, authorized, ...props }) => (
  <Route {...props} render={() => (authorized ? <Component /> : <Redirect to={'/'} />)} />
);
export default PrivateRoute;

PrivateRoute.propTypes = {
  authorized: PropTypes.bool.isRequired,
  component: PropTypes.object.isRequired,
};
