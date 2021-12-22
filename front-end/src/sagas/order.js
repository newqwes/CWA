import { takeEvery, all, call } from 'redux-saga/effects';

import { GET_USER_ORDERS_PENDING, SET_USER_ORDER_PENDING } from '../actions';

import { orderAPI } from '../api';

function* setUserOrder({ payload }) {
  const { count, name, price, date } = payload;

  yield call(orderAPI.setUserOrder, { count, name, price, date });
}

function* getUserOrders() {
  const orders = yield call(orderAPI.getUserOrders);

  console.log(orders);
}

export function orderSaga() {
  return all([
    takeEvery(SET_USER_ORDER_PENDING, setUserOrder),
    takeEvery(GET_USER_ORDERS_PENDING, getUserOrders),
  ]);
}
