import { takeEvery, all } from 'redux-saga/effects';

import { SET_AUTH_DATA } from '../actions';

export function* saveAuthDataToSession({ payload }) {
  yield sessionStorage.setItem('username', payload.username);
  yield sessionStorage.setItem('password', payload.password);
}

export function authSaga() {
  return all([takeEvery(SET_AUTH_DATA, saveAuthDataToSession)]);
}
