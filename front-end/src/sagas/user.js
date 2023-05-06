import { all, call, put, takeEvery } from 'redux-saga/effects';

import { DELETE_USER_PENDING, GET_USER_LIST_PENDING } from '../actions';
import {
  NOTIFICATION_ERROR_MESSAGE,
  NOTIFICATION_TYPE,
} from '../constants/notification';

import {
  deleteUserFailureAC,
  deleteUserSuccessAC,
  getUserListFailureAC,
  getUserListSuccessAC,
} from '../actionCreators/user';
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

function* getUserList() {
  try {
    const users = yield call(userAPI.getUserList);

    yield put(getUserListSuccessAC(users.data));
  } catch (error) {
    yield put(getUserListFailureAC());
  }
}

export function userSaga() {
  return all([
    takeEvery(DELETE_USER_PENDING, deleteUserData),
    takeEvery(GET_USER_LIST_PENDING, getUserList),
  ]);
}
