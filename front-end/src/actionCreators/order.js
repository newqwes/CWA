import {
  GET_USER_ORDERS_PENDING,
  GET_USER_ORDERS_SUCCESS,
  SET_USER_ORDER_PENDING,
  GET_USER_ORDERS_FAILURE,
  SET_USER_ORDER_SUCCESS,
  SET_USER_ORDER_FAILURE,
  DELETE_USER_ORDER_PENDING,
  DELETE_USER_ORDER_SUCCESS,
  DELETE_USER_ORDER_FAILURE,
  SET_USER_ORDERS_PENDING,
} from '../actions';

export const getOrdersAC = () => ({
  type: GET_USER_ORDERS_PENDING,
});

export const getOrdersSuccessAC = data => ({
  type: GET_USER_ORDERS_SUCCESS,
  payload: data,
});

export const getOrdersFailureAC = error => ({
  type: GET_USER_ORDERS_FAILURE,
  payload: error,
});

export const setOrderAC = ({ count, coinId, price, date }) => ({
  type: SET_USER_ORDER_PENDING,
  payload: { count, coinId, price, date },
});

export const setOrderSuccessAC = data => ({
  type: SET_USER_ORDER_SUCCESS,
  payload: data,
});

export const setOrderFailureAC = error => ({
  type: SET_USER_ORDER_FAILURE,
  payload: error,
});

export const deleteOrderAC = orderId => ({
  type: DELETE_USER_ORDER_PENDING,
  payload: orderId,
});

export const deleteOrderSuccessAC = orderId => ({
  type: DELETE_USER_ORDER_SUCCESS,
  payload: orderId,
});

export const deleteOrderFailureAC = error => ({
  type: DELETE_USER_ORDER_FAILURE,
  payload: error,
});

export const setOrdersAC = orders => ({
  type: SET_USER_ORDERS_PENDING,
  payload: orders,
});
