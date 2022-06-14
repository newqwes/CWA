import { takeEvery, all, call } from 'redux-saga/effects';

import { DELETE_USER_DATA } from '../actions';

import { userAPI } from '../api';

function* deleteUser() {
  const res = yield call(userAPI.deleteUser);

  return res;
}

export function userSaga() {
  return all([takeEvery(DELETE_USER_DATA, deleteUser)]);
}
