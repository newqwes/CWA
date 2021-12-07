import { all } from 'redux-saga/effects';

import { authSaga } from './auth';
import { notificationSaga } from './notification';

function* rootSaga() {
  yield all([authSaga(), notificationSaga()]);
}

export default rootSaga;
