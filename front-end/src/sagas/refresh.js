import { all, call, put, select, takeEvery } from 'redux-saga/effects';
import { getOr, map, omit } from 'lodash/fp';

import {
  loadingPendingAC,
  loadingSuccessAC,
  setNotificationAC,
} from '../actionCreators/aplication';
import { refreshAPI } from '../api';

import {
  HANDLE_REFRESH,
  HANDLE_REFRESH_FAILURE,
  HANDLE_REFRESH_SUCCESS,
} from '../actions';
import { setUserDataAC, setUserHistoryAC } from '../actionCreators/user';
import { NOTIFICATION_TYPE } from '../constants/notification';
import {
  handleRefreshFailureAC,
  handleRefreshSuccessAC,
} from '../actionCreators/refresh';
import {
  getGridRowData,
  getNetProfitPercent,
  getOrderCoinList,
  getWalletState,
  isNotOrderList,
} from '../selectors/order';
import { handleCoinHoldPlaceAC } from '../actionCreators/order';

function* refresh() {
  try {
    yield put(handleCoinHoldPlaceAC('All'));
    yield put(loadingPendingAC());

    const noData = yield select(isNotOrderList);

    if (noData) {
      return;
    }

    const netProfit = yield select(getNetProfitPercent);
    const walletState = yield select(getWalletState);
    const gridRowData = yield select(getGridRowData);
    const coinList = yield select(getOrderCoinList);

    const prevData = {
      netProfit,
      walletState,
      gridRowData: map(omit(['icon']), gridRowData),
    };

    const data = yield call(refreshAPI.refresh, { prevData, coinList });

    if (data.email) {
      yield put(handleRefreshSuccessAC(data));
      yield put(setUserHistoryAC(data.history));
      yield put(loadingSuccessAC());
      return;
    }

    yield put(handleRefreshFailureAC(data));
    yield put(loadingSuccessAC());
  } catch (error) {
    const data = getOr({ message: 'Ошибка ui' }, ['response', 'data'], error);

    yield put(handleRefreshFailureAC(data));
    yield put(loadingSuccessAC());
  }
}

function* refreshSuccess({ payload }) {
  yield put(setUserDataAC(payload));

  yield put(
    setNotificationAC({
      message: `Осталось средств: ${payload.score} cwa`,
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
