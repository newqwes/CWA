import { takeEvery, all, call, put } from 'redux-saga/effects';
import { loadingPendingAC, loadingSuccessAC } from '../actionCreators/aplication';
import {
  getOrdersAC,
  getOrdersFailureAC,
  getOrdersSuccessAC,
  setOrderFailureAC,
  setOrderSuccessAC,
} from '../actionCreators/order';

import { SET_USER_ORDER_PENDING, SET_USER_DATA } from '../actions';

import { orderAPI } from '../api';

function* setUserOrder({ payload }) {
  try {
    yield put(loadingPendingAC());

    const { count, name, price, date } = payload;

    const { data } = yield call(orderAPI.setUserOrder, { count, name, price, date });

    yield put(setOrderSuccessAC(data));
    yield put(loadingSuccessAC());
  } catch ({ response: { data } }) {
    yield put(setOrderFailureAC(data));
    yield put(loadingSuccessAC());
  }
}

function* getUserOrders() {
  try {
    yield put(getOrdersAC());
    yield put(loadingPendingAC());

    const { data } = yield call(orderAPI.getUserOrders);

    yield put(getOrdersSuccessAC(data));
    yield put(loadingSuccessAC());
  } catch ({ response: { data } }) {
    yield put(getOrdersFailureAC(data));
    yield put(loadingSuccessAC());
  }
}

export function orderSaga() {
  return all([
    takeEvery(SET_USER_ORDER_PENDING, setUserOrder),
    takeEvery(SET_USER_DATA, getUserOrders),
  ]);
}
