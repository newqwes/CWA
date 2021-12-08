import { assoc, compose } from 'lodash/fp';
import {
  AUTH_FAILURE,
  AUTH_LOGOUT,
  AUTH_SUCCESS,
  GET_AUTHORIZATION_STATUS_FAILURE,
  GET_AUTHORIZATION_STATUS_SUCCESS,
  REGISTRATION_FAILURE,
  REGISTRATION_SUCCESS,
} from '../actions';

const initialState = {
  authorized: false,
  error: '',
};

const authorization = (state = initialState, { type, payload }) => {
  switch (type) {
    case AUTH_SUCCESS:
    case REGISTRATION_SUCCESS:
    case GET_AUTHORIZATION_STATUS_SUCCESS: {
      return compose(assoc(['authorized'], true), assoc(['error'], ''))(state);
    }

    case AUTH_FAILURE:
    case REGISTRATION_FAILURE: {
      return compose(assoc(['authorized'], false), assoc(['error'], payload))(state);
    }

    case AUTH_LOGOUT:
    case GET_AUTHORIZATION_STATUS_FAILURE: {
      return assoc(['authorized'], false, state);
    }

    default:
      return state;
  }
};

export default authorization;
