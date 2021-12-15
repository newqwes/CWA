import { takeEvery, all, call, put } from 'redux-saga/effects';

import {
  closeAuthorizationModalsAC,
  loadingPendingAC,
  loadingSuccessAC,
  setNotificationAC,
} from '../actionCreators/aplication';
import {
  authFailureAC,
  authSuccessAC,
  getAuthorizationStatusFailureAC,
  getAuthorizationStatusSuccessAC,
  googleAuthFailureAC,
  registrationFailureAC,
  registrationSuccessAC,
} from '../actionCreators/auth';
import { authAPI } from '../api';

import {
  AUTH_FAILURE,
  AUTH_LOGOUT,
  AUTH_PENDING,
  AUTH_SUCCESS,
  GET_AUTHORIZATION_STATUS_PENDING,
  GET_GOOGLE_AUTHORIZATION_PENDING,
  REGISTRATION_FAILURE,
  REGISTRATION_PENDING,
  REGISTRATION_SUCCESS,
} from '../actions';
import { AUTH_TOKEN } from '../constants/authModal';
import { setSession } from '../utils/localStore';
import { NOTIFICATION_MESSAGE_PLACEMENT, NOTIFICATION_TYPE } from '../constants/notification';

function* authorization({ payload }) {
  try {
    yield put(loadingPendingAC());

    const data = yield call(authAPI.login, payload);

    if (data.accessToken) {
      yield call(setSession, AUTH_TOKEN, data.accessToken);

      yield put(authSuccessAC(data));
    } else {
      yield put(authFailureAC(data));
    }

    yield put(loadingSuccessAC());
  } catch ({ response: { data } }) {
    yield put(authFailureAC(data));
    yield put(loadingSuccessAC());
  }
}

function* logout() {
  try {
    yield put(loadingPendingAC());

    yield call(authAPI.logout);

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

    if (data.accessToken) {
      yield call(setSession, AUTH_TOKEN, data.accessToken);

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
      placement: NOTIFICATION_MESSAGE_PLACEMENT.bottomRight,
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

function* authorizationStatus() {
  try {
    yield put(loadingPendingAC());

    const { email } = yield call(authAPI.status);

    if (email) {
      yield put(getAuthorizationStatusSuccessAC());
      yield put(loadingSuccessAC());

      return;
    }

    yield call(setSession, AUTH_TOKEN);
    yield put(getAuthorizationStatusFailureAC());
    yield put(loadingSuccessAC());
  } catch (e) {
    yield put(getAuthorizationStatusFailureAC());
    yield put(loadingSuccessAC());
  }
}

function* getGoogleAuthorization() {
  try {
    yield put(loadingPendingAC());

    yield call(authAPI.googleAuth);

    yield put(closeAuthorizationModalsAC());
    yield put(loadingSuccessAC());
  } catch ({ response: { data } }) {
    yield put(googleAuthFailureAC(data));
    yield put(loadingSuccessAC());
  }
}

export function authSaga() {
  return all([
    takeEvery(AUTH_PENDING, authorization),
    takeEvery(REGISTRATION_PENDING, registration),
    takeEvery(AUTH_SUCCESS, authSuccess),
    takeEvery(AUTH_FAILURE, authFailure),
    takeEvery(REGISTRATION_SUCCESS, registrationSuccess),
    takeEvery(REGISTRATION_FAILURE, registrationFailure),
    takeEvery(GET_AUTHORIZATION_STATUS_PENDING, authorizationStatus),
    takeEvery(GET_GOOGLE_AUTHORIZATION_PENDING, getGoogleAuthorization),
    takeEvery(AUTH_LOGOUT, logout),
  ]);
}
