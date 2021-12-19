import { all } from 'redux-saga/effects';

import { authSaga } from './auth';
import { notificationSaga } from './notification';
import { refreshSaga } from './refresh';

function* rootSaga() {
  yield all([authSaga(), notificationSaga(), refreshSaga()]);
}

export default rootSaga;
