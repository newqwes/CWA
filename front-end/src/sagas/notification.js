import { takeEvery, all, call } from 'redux-saga/effects';

import { SET_NOTIFICATION_FORM } from '../actions';
import { setNotificationForm } from '../utils/notification';

function* notificationForm({ payload }) {
  yield call(setNotificationForm, payload);
}

export function notificationSaga() {
  return all([takeEvery(SET_NOTIFICATION_FORM, notificationForm)]);
}
