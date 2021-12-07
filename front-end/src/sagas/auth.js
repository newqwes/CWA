import { takeEvery, all, call, put } from 'redux-saga/effects';

import {
  loadingPendingAC,
  loadingSuccessAC,
  setNotificationAC,
} from '../actionCreators/aplication';
import {
  authFailureAC,
  authSuccessAC,
  registrationFailureAC,
  registrationSuccessAC,
} from '../actionCreators/auth';
import { authAPI } from '../api';

import {
  AUTH_FAILURE,
  AUTH_PENDING,
  AUTH_SUCCESS,
  REGISTRATION_FAILURE,
  REGISTRATION_PENDING,
  REGISTRATION_SUCCESS,
} from '../actions';
import { AUTH_TOKEN } from '../constants/authModal';
import { setSession } from '../utils/localStore';
import { NOTIFICATION_TYPE } from '../constants/notification';

function* authorization({ payload }) {
  try {
    yield put(loadingPendingAC());
    const data = yield call(authAPI.login, payload);

    if (data.token) {
      yield call(setSession, AUTH_TOKEN, data.token);

      yield put(authSuccessAC(data));

      yield put(loadingSuccessAC());
    } else {
      yield put(authFailureAC(data));
    }

    yield put(loadingSuccessAC());
  } catch ({ response: { data } }) {
    yield put(authFailureAC(data));
    yield put(loadingSuccessAC());
  }
}

function* registration({ payload }) {
  try {
    yield put(loadingPendingAC());
    const data = yield call(authAPI.registration, payload);

    if (data.token) {
      yield call(setSession, AUTH_TOKEN, data.token);

      yield put(registrationSuccessAC(data));

      yield put(loadingSuccessAC());
    } else {
      yield put(registrationFailureAC(data));
    }

    yield put(loadingSuccessAC());
  } catch ({ response: { data } }) {
    yield put(registrationFailureAC(data));
    yield put(loadingSuccessAC());
  }
}

function* authSuccess({ payload }) {
  yield put(
    setNotificationAC({
      message: `С возвращением ${payload.login}`,
      type: NOTIFICATION_TYPE.success,
    }),
  );
}

function* authFailure({ payload }) {
  yield put(
    setNotificationAC({
      message: payload.message,
      type: NOTIFICATION_TYPE.error,
    }),
  );
}

function* registrationSuccess({ payload }) {
  yield put(
    setNotificationAC({
      message: `Добро пожаловать ${payload.login}!`,
      type: NOTIFICATION_TYPE.success,
    }),
  );
}

function* registrationFailure({ payload }) {
  yield put(
    setNotificationAC({
      message: payload.message,
      type: NOTIFICATION_TYPE.error,
    }),
  );
}

export function authSaga() {
  return all([
    takeEvery(AUTH_PENDING, authorization),
    takeEvery(REGISTRATION_PENDING, registration),
    takeEvery(AUTH_SUCCESS, authSuccess),
    takeEvery(AUTH_FAILURE, authFailure),
    takeEvery(REGISTRATION_SUCCESS, registrationSuccess),
    takeEvery(REGISTRATION_FAILURE, registrationFailure),
  ]);
}
