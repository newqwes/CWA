import { takeEvery, all, call, put } from 'redux-saga/effects';

import { DELETE_USER_PENDING } from '../actions';
import { NOTIFICATION_ERROR_MESSAGE, NOTIFICATION_TYPE } from '../constants/notification';

import { deleteUserFailureAC, deleteUserSuccessAC } from '../actionCreators/user';
import { setNotificationAC } from '../actionCreators/aplication';
import { authLogoutAC } from '../actionCreators/auth';

import { userAPI } from '../api';

function* deleteSuccess(message) {
  yield put(
    setNotificationAC({
      message,
      type: NOTIFICATION_TYPE.success,
    }),
  );
}

function* deleteFailure() {
  yield put(
    setNotificationAC({
      message: NOTIFICATION_ERROR_MESSAGE,
      type: NOTIFICATION_TYPE.error,
    }),
  );
}

function* deleteUserData() {
  try {
    const { message } = yield call(userAPI.deleteUser);

    yield put(deleteUserSuccessAC());

    yield put(authLogoutAC());

    yield deleteSuccess(message);
  } catch (error) {
    yield put(deleteUserFailureAC());

    yield deleteFailure();
  }
}

export function userSaga() {
  return all([takeEvery(DELETE_USER_PENDING, deleteUserData)]);
}
