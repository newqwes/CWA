import { takeEvery, all, call, put } from 'redux-saga/effects';

import { loadingPending, loadingSuccess } from '../actionCreators';
import { authFailure, authSuccess } from '../actionCreators/auth';
import { authAPI } from '../api';

import { AUTH_PENDING } from '../actions';
import { AUTH_TOKEN } from '../constants/authModal';

function* login({ payload }) {
  try {
    yield put(loadingPending());
    const token = call(authAPI.login, payload);

    console.log('token', token);
    yield call(sessionStorage.setItem, AUTH_TOKEN, token);

    yield put(authSuccess());

    yield put(loadingSuccess());
  } catch ({ response }) {
    yield put(authFailure(response));
    yield put(loadingSuccess());
  }
}

export function authSaga() {
  return all([takeEvery(AUTH_PENDING, login)]);
}
