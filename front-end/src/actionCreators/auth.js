import {
  AUTH_PENDING,
  AUTH_FAILURE,
  AUTH_SUCCESS,
  REGISTRATION_PENDING,
  REGISTRATION_FAILURE,
  REGISTRATION_SUCCESS,
} from '../actions';

export const authPending = authData => ({
  type: AUTH_PENDING,
  payload: authData,
});

export const authFailure = error => ({
  type: AUTH_FAILURE,
  payload: error,
});

export const authSuccess = data => ({
  type: AUTH_SUCCESS,
  payload: data,
});

export const registrationPending = registrationData => ({
  type: REGISTRATION_PENDING,
  payload: registrationData,
});

export const registrationFailure = error => ({
  type: REGISTRATION_FAILURE,
  payload: error,
});

export const registrationSuccess = data => ({
  type: REGISTRATION_SUCCESS,
  payload: data,
});
