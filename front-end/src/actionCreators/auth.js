import { AUTH_PENDING, AUTH_FAILURE, AUTH_SUCCESS } from '../actions';

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
