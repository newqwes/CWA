import { takeEvery, all, call, put } from 'redux-saga/effects';

import { loadingPending, loadingSuccess } from '../actionCreators/aplication';
import {
  authFailure,
  authSuccess,
  registrationFailure,
  registrationSuccess,
} from '../actionCreators/auth';
import { authAPI } from '../api';

import { AUTH_PENDING, REGISTRATION_PENDING } from '../actions';
import { AUTH_TOKEN } from '../constants/authModal';

function* login({ payload }) {
  try {
    yield put(loadingPending());
    const token = yield call(authAPI.login, payload);

    yield call(sessionStorage.setItem, AUTH_TOKEN, token);

    yield put(authSuccess());

    yield put(loadingSuccess());
  } catch ({ response }) {
    yield put(authFailure(response));
    yield put(loadingSuccess());
  }
}

function* registration({ payload }) {
  try {
    yield put(loadingPending());
    const token = yield call(authAPI.registration, payload);

    yield call(sessionStorage.setItem, AUTH_TOKEN, token);

    yield put(registrationSuccess());

    yield put(loadingSuccess());
  } catch ({ response }) {
    yield put(registrationFailure(response));
    yield put(loadingSuccess());
  }
}

export function authSaga() {
  return all([takeEvery(AUTH_PENDING, login), takeEvery(REGISTRATION_PENDING, registration)]);
}
