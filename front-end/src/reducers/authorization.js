import { assoc, compose } from 'lodash/fp';
import {
  AUTH_FAILURE,
  AUTH_SUCCESS,
  LOGOUT_FAILURE,
  LOGOUT_SUCCESS,
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
    case REGISTRATION_SUCCESS: {
      return compose(assoc(['authorized'], true), assoc(['error'], ''))(state);
    }

    case AUTH_FAILURE:
    case REGISTRATION_FAILURE: {
      return compose(assoc(['authorized'], false), assoc(['error'], payload))(state);
    }

    case LOGOUT_SUCCESS: {
      return assoc(['authorized'], false, state);
    }

    case LOGOUT_FAILURE: {
      return assoc(['error'], payload, state);
    }

    default:
      return state;
  }
};

export default authorization;
