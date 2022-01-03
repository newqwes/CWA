import { takeEvery, all, call, put, select } from 'redux-saga/effects';

import {
  loadingPendingAC,
  loadingSuccessAC,
  setNotificationAC,
} from '../actionCreators/aplication';
import { refreshAPI } from '../api';

import { HANDLE_REFRESH, HANDLE_REFRESH_FAILURE, HANDLE_REFRESH_SUCCESS } from '../actions';
import { setUserDataAC } from '../actionCreators/user';
import { NOTIFICATION_TYPE } from '../constants/notification';
import { handleRefreshFailureAC, handleRefreshSuccessAC } from '../actionCreators/refresh';
import { getNetProfit, getWalletState, getGridRowData, getLastModified } from '../selectors/order';

function* refresh() {
  try {
    yield put(loadingPendingAC());

    const netProfit = yield select(getNetProfit);
    const walletState = yield select(getWalletState);
    const gridRowData = yield select(getGridRowData);
    const lastModified = yield select(getLastModified);

    const prevData = { netProfit, walletState, lastModified, gridRowData };

    const data = yield call(refreshAPI.refresh, prevData);

    if (data.email) {
      yield put(handleRefreshSuccessAC(data));
      yield put(loadingSuccessAC());
      return;
    }

    yield put(handleRefreshFailureAC(data));
    yield put(loadingSuccessAC());
  } catch ({ response: { data } }) {
    yield put(handleRefreshFailureAC(data));
    yield put(loadingSuccessAC());
  }
}

function* refreshSuccess({ payload }) {
  yield put(setUserDataAC(payload));

  yield put(
    setNotificationAC({
      message: `Твой счет: ${payload.score}`,
      type: NOTIFICATION_TYPE.success,
    }),
  );
}

function* refreshFailure({ payload }) {
  yield put(
    setNotificationAC({
      message: payload.message,
      type: NOTIFICATION_TYPE.error,
    }),
  );
}

export function refreshSaga() {
  return all([
    takeEvery(HANDLE_REFRESH, refresh),
    takeEvery(HANDLE_REFRESH_SUCCESS, refreshSuccess),
    takeEvery(HANDLE_REFRESH_FAILURE, refreshFailure),
  ]);
}
