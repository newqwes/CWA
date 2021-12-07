import { takeEvery, all, call } from 'redux-saga/effects';

import { SET_NOTIFICATION, SET_NOTIFICATION_FORM } from '../actions';
import { getNotification, setNotificationForm } from '../utils/notification';

function* notificationForm({ payload }) {
  yield call(setNotificationForm, payload);
}

function* notification({ payload }) {
  yield call(getNotification, payload);
}

export function notificationSaga() {
  return all([
    takeEvery(SET_NOTIFICATION_FORM, notificationForm),
    takeEvery(SET_NOTIFICATION, notification),
  ]);
}
