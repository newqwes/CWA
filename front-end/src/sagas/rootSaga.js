import { all } from 'redux-saga/effects';

import { authSaga } from './auth';
import { notificationSaga } from './notification';
import { refreshSaga } from './refresh';
import { orderSaga } from './order';
import { userSaga } from './user';

function* rootSaga() {
  yield all([authSaga(), notificationSaga(), refreshSaga(), orderSaga(), userSaga()]);
}

export default rootSaga;
