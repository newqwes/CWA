import { all, call, put, takeEvery } from 'redux-saga/effects';

import {
  DELETE_USER_PENDING,
  GET_USER_LIST_PENDING,
  GET_USER_PLACE_LIST_PENDING,
  SET_USER_NEW_PLACE,
} from '../actions';
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
import { loadingPendingAC, loadingSuccessAC, setNotificationAC } from '../actionCreators/aplication';
import { authLogoutAC } from '../actionCreators/auth';
import { userAPI } from '../api';
import {
  getUserPlaceListAC, getUserPlaceListFailureAC,
  getUserPlaceListSuccessAC,
  setNewPlaceFailureAC,
  setNewPlaceSuccessAC,
} from '../actionCreators/order';

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

function* setUserNewPlace({ payload }) {
  try {
    yield put(loadingPendingAC());
    const { data } = yield call(userAPI.setUserNewPlace, payload);
    yield put(getUserPlaceListAC());
    yield put(setNewPlaceSuccessAC(data));
  } catch ({ response: { data } }) {
    yield put(setNewPlaceFailureAC(data));
  } finally {
    yield put(loadingSuccessAC());
  }
}

function* getUserPlaceList() {
  try {
    yield put(loadingPendingAC());
    const { data } = yield call(userAPI.getUserPlaceList);
    yield put(getUserPlaceListSuccessAC(data));
  } catch (error) {
    yield put(getUserPlaceListFailureAC(error));
  } finally {
    yield put(loadingSuccessAC());
  }
}

export function userSaga() {
  return all([
    takeEvery(DELETE_USER_PENDING, deleteUserData),
    takeEvery(GET_USER_LIST_PENDING, getUserList),
    takeEvery(SET_USER_NEW_PLACE, setUserNewPlace),
    takeEvery(GET_USER_PLACE_LIST_PENDING, getUserPlaceList),
  ]);
}
