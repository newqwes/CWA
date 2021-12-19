import { takeEvery, all, call, put, delay } from 'redux-saga/effects';

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
  getAuthorizationStatusAC,
} from '../actionCreators/auth';
import { authAPI, googleLoginURL } from '../api';

import {
  AUTH_FAILURE,
  AUTH_LOGOUT,
  AUTH_PENDING,
  AUTH_SUCCESS,
  GET_AUTHORIZATION_STATUS_FAILURE,
  GET_AUTHORIZATION_STATUS_PENDING,
  GET_AUTHORIZATION_STATUS_SUCCESS,
  GET_GOOGLE_AUTHORIZATION_PENDING,
  REGISTRATION_FAILURE,
  REGISTRATION_PENDING,
  REGISTRATION_SUCCESS,
} from '../actions';
import { AUTH_TOKEN } from '../constants/authModal';
import { setSession } from '../utils/localStore';
import { NOTIFICATION_TYPE } from '../constants/notification';
import { openCenteredWindow } from '../utils/openCenteredWindow';
import { setUserDataAC } from '../actionCreators/user';

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

    yield put(getAuthorizationStatusAC());
    yield put(loadingSuccessAC());
  } catch ({ response: { data } }) {
    yield put(authFailureAC(data));
    yield put(loadingSuccessAC());
  }
}

function* logout() {
  try {
    yield put(loadingPendingAC());

    yield call(setSession, AUTH_TOKEN);
    yield call(authAPI.logout);

    yield put(getAuthorizationStatusAC());
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

    yield put(getAuthorizationStatusAC());
    yield put(loadingSuccessAC());
  } catch ({ response: { data } }) {
    yield put(registrationFailureAC(data));
    yield put(loadingSuccessAC());
  }
}

function* authorizationStatus() {
  try {
    yield put(loadingPendingAC());

    const user = yield call(authAPI.status);

    if (user.isActivated) {
      yield put(getAuthorizationStatusSuccessAC(user));
      yield put(loadingSuccessAC());

      return;
    }

    if (!user || user.error) {
      yield put(getAuthorizationStatusFailureAC(user.error));
      yield call(setSession, AUTH_TOKEN);
    }

    yield put(loadingSuccessAC());
  } catch (e) {
    yield put(getAuthorizationStatusFailureAC());
    yield put(loadingSuccessAC());
  }
}

function* callSelfTilWindowClose(googleAuthWindow) {
  if (googleAuthWindow && !googleAuthWindow.closed) {
    yield delay(500);

    yield call(callSelfTilWindowClose, googleAuthWindow);
  } else {
    yield put(getAuthorizationStatusAC());
  }
}

function* getGoogleAuthorization() {
  try {
    yield put(loadingPendingAC());

    const googleAuthWindow = yield call(openCenteredWindow, {
      height: 600,
      width: 500,
      url: googleLoginURL,
    });

    yield put(closeAuthorizationModalsAC());

    yield call(callSelfTilWindowClose, googleAuthWindow);
    yield put(loadingSuccessAC());
  } catch ({ response }) {
    yield put(googleAuthFailureAC(response));
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

function* authorizationStatusSuccess({ payload }) {
  yield put(setUserDataAC(payload));
  yield put(
    setNotificationAC({
      message: `С возвращение ${payload.login}!`,
      type: NOTIFICATION_TYPE.success,
    }),
  );
}

function* authorizationStatusFailure({ payload }) {
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
    takeEvery(GET_AUTHORIZATION_STATUS_PENDING, authorizationStatus),
    takeEvery(GET_GOOGLE_AUTHORIZATION_PENDING, getGoogleAuthorization),
    takeEvery(AUTH_LOGOUT, logout),
    takeEvery(GET_AUTHORIZATION_STATUS_SUCCESS, authorizationStatusSuccess),
    takeEvery(GET_AUTHORIZATION_STATUS_FAILURE, authorizationStatusFailure),
  ]);
}
