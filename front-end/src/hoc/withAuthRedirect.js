import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { isAuthorized } from '../selectors/authorization';

const mapStateToProps = state => ({
  authorized: isAuthorized(state),
});

export const withAuthRedirect = Component => {
  class RedirectComponent extends React.Component {
    static propTypes = {
      authorized: PropTypes.bool.isRequired,
    };

    render() {
      if (!this.props.authorized) return <Redirect to='/' />;

      return <Component {...this.props} />;
    }
  }

  const AuthRedirectComponent = connect(mapStateToProps)(RedirectComponent);

  return AuthRedirectComponent;
};
