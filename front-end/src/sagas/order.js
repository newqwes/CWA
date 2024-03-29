import { all, call, put, take, takeEvery } from 'redux-saga/effects';
import {
  loadingPendingAC,
  loadingSuccessAC,
} from '../actionCreators/aplication';
import {
  deleteOrderFailureAC,
  deleteOrderSuccessAC,
  getBackupOrdersFailureAC,
  getOrdersAC,
  getOrdersFailureAC,
  getOrdersSuccessAC,
  setOrderFailureAC,
  setOrderSuccessAC,
} from '../actionCreators/order';
import { handleRefreshAC } from '../actionCreators/refresh';

import {
  DELETE_USER_ORDER_PENDING,
  GET_BACKUP_USER_ORDERS_PENDING,
  GET_USER_ORDERS_PENDING,
  GET_USER_ORDERS_SUCCESS,
  SET_USER_ORDER_PENDING,
  SET_USER_ORDERS_PENDING,
  UPDATE_USER_ORDER_PENDING,
} from '../actions';

import { orderAPI } from '../api';

function* setUserOrder({ payload }) {
  try {
    yield put(loadingPendingAC());

    const { count, coinId, price, date, place } = payload;

    const { data } = yield call(orderAPI.setUserOrder, {
      count,
      coinId,
      price,
      date,
      place,
    });
    yield put(getOrdersAC());
    yield put(setOrderSuccessAC(data));

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
    yield put(loadingSuccessAC());
  } catch ({ response: { data } }) {
    yield put(getOrdersFailureAC(data));
    yield put(loadingSuccessAC());
  }
}

function* getBackupUserOrders() {
  try {
    yield put(loadingPendingAC());

    const { data } = yield call(orderAPI.getBackupUserOrders);

    yield put(loadingSuccessAC());

    const element = document.createElement('a');
    const file = new Blob([data], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'cwa-backup.txt';
    document.body.appendChild(element); // Добавляем ссылку на элемент в DOM
    element.click(); // Имитируем клик по элементу для начала загрузки файла
    document.body.removeChild(element); // Удаляем ссылку на элемент из DOM
  } catch ({ response: { data } }) {
    yield put(getBackupOrdersFailureAC(data));
    yield put(loadingSuccessAC());
  }
}

function* deleteUserOrder({ payload }) {
  try {
    yield put(loadingPendingAC());

    const { data: orderId } = yield call(orderAPI.deleteUserOrder, payload);

    yield put(deleteOrderSuccessAC(orderId));
    yield put(getOrdersAC());
    const success = yield take(GET_USER_ORDERS_SUCCESS);

    if (success) {
      yield put(handleRefreshAC());
    }
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
    const success = yield take(GET_USER_ORDERS_SUCCESS);

    if (success) {
      yield put(handleRefreshAC());
    }
    yield put(loadingSuccessAC());
  } catch ({ response: { data } }) {
    yield put(deleteOrderFailureAC(data));
    yield put(loadingSuccessAC());
  }
}

function* updateUserOrder({ payload }) {
  try {
    yield put(loadingPendingAC());

    yield call(orderAPI.updateUserOrder, payload);
    yield put(getOrdersAC());
    yield put(loadingSuccessAC());
  } catch ({ response: { data } }) {
    yield put(loadingSuccessAC());
  }
}

export function orderSaga() {
  return all([
    takeEvery(SET_USER_ORDER_PENDING, setUserOrder),
    takeEvery(DELETE_USER_ORDER_PENDING, deleteUserOrder),
    takeEvery(GET_USER_ORDERS_PENDING, getUserOrders),
    takeEvery(SET_USER_ORDERS_PENDING, setUserOrders),
    takeEvery(UPDATE_USER_ORDER_PENDING, updateUserOrder),
    takeEvery(GET_BACKUP_USER_ORDERS_PENDING, getBackupUserOrders),
  ]);
}
