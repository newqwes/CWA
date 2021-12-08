import {
  AUTH_LOGOUT,
  AUTH_PENDING,
  AUTH_FAILURE,
  AUTH_SUCCESS,
  REGISTRATION_PENDING,
  REGISTRATION_FAILURE,
  REGISTRATION_SUCCESS,
  GET_AUTHORIZATION_STATUS_PENDING,
  GET_AUTHORIZATION_STATUS_FAILURE,
  GET_AUTHORIZATION_STATUS_SUCCESS,
} from '../actions';

export const authPendingAC = authData => ({
  type: AUTH_PENDING,
  payload: authData,
});

export const authFailureAC = error => ({
  type: AUTH_FAILURE,
  payload: error,
});

export const authSuccessAC = data => ({
  type: AUTH_SUCCESS,
  payload: data,
});

export const registrationPendingAC = registrationData => ({
  type: REGISTRATION_PENDING,
  payload: registrationData,
});

export const registrationFailureAC = error => ({
  type: REGISTRATION_FAILURE,
  payload: error,
});

export const registrationSuccessAC = data => ({
  type: REGISTRATION_SUCCESS,
  payload: data,
});

export const getAuthorizationStatusAC = () => ({
  type: GET_AUTHORIZATION_STATUS_PENDING,
});

export const getAuthorizationStatusSuccessAC = () => ({
  type: GET_AUTHORIZATION_STATUS_SUCCESS,
});

export const getAuthorizationStatusFailureAC = () => ({
  type: GET_AUTHORIZATION_STATUS_FAILURE,
});

export const authLogoutAC = () => ({
  type: AUTH_LOGOUT,
});
