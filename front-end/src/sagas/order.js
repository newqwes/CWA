import { takeEvery, all, call, put } from 'redux-saga/effects';
import { loadingPendingAC, loadingSuccessAC } from '../actionCreators/aplication';
import {
  deleteOrderFailureAC,
  deleteOrderSuccessAC,
  getOrdersAC,
  getOrdersFailureAC,
  getOrdersSuccessAC,
  setOrderFailureAC,
  setOrderSuccessAC,
} from '../actionCreators/order';
import { handleRefreshAC } from '../actionCreators/refresh';

import {
  SET_USER_ORDER_PENDING,
  DELETE_USER_ORDER_PENDING,
  GET_USER_ORDERS_PENDING,
  SET_USER_ORDERS_PENDING,
} from '../actions';

import { orderAPI } from '../api';

function* setUserOrder({ payload }) {
  try {
    yield put(loadingPendingAC());

    const { count, name, price, date } = payload;

    const { data } = yield call(orderAPI.setUserOrder, { count, name, price, date });
    yield put(getOrdersAC());
    yield put(setOrderSuccessAC(data));
    yield put(handleRefreshAC());
    yield put(loadingSuccessAC());
  } catch ({ response: { data } }) {
    yield put(setOrderFailureAC(data));
    yield put(loadingSuccessAC());
  }
}

function* getUserOrders() {
  try {
    yield put(loadingPendingAC());

    const { data } = yield call(orderAPI.getUserOrders);

    yield put(getOrdersSuccessAC(data));
    yield put(handleRefreshAC());
    yield put(loadingSuccessAC());
  } catch ({ response: { data } }) {
    yield put(getOrdersFailureAC(data));
    yield put(loadingSuccessAC());
  }
}

function* deleteUserOrder({ payload }) {
  try {
    yield put(loadingPendingAC());

    const { data: orderId } = yield call(orderAPI.deleteUserOrder, payload);

    yield put(deleteOrderSuccessAC(orderId));
    yield put(getOrdersAC());
    yield put(handleRefreshAC());
    yield put(loadingSuccessAC());
  } catch ({ response: { data } }) {
    yield put(deleteOrderFailureAC(data));
    yield put(loadingSuccessAC());
  }
}

function* setUserOrders({ payload }) {
  try {
    yield put(loadingPendingAC());

    yield call(orderAPI.setUserOrders, payload);
    yield put(getOrdersAC());
    yield put(handleRefreshAC());
    yield put(loadingSuccessAC());
  } catch ({ response: { data } }) {
    yield put(deleteOrderFailureAC(data));
    yield put(loadingSuccessAC());
  }
}

export function orderSaga() {
  return all([
    takeEvery(SET_USER_ORDER_PENDING, setUserOrder),
    takeEvery(DELETE_USER_ORDER_PENDING, deleteUserOrder),
    takeEvery(GET_USER_ORDERS_PENDING, getUserOrders),
    takeEvery(SET_USER_ORDERS_PENDING, setUserOrders),
  ]);
}
