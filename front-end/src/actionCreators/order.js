import {
  DELETE_USER_ORDER_FAILURE,
  DELETE_USER_ORDER_PENDING,
  DELETE_USER_ORDER_SUCCESS,
  GET_BACKUP_USER_ORDERS_FAILURE,
  GET_BACKUP_USER_ORDERS_PENDING,
  GET_USER_ORDERS_FAILURE,
  GET_USER_ORDERS_PENDING,
  GET_USER_ORDERS_SUCCESS,
  GET_USER_PLACE_LIST_FAILURE,
  GET_USER_PLACE_LIST_PENDING,
  GET_USER_PLACE_LIST_SUCCESS,
  HANDLE_COIN_HOLD_PLACE,
  SET_USER_NEW_PLACE,
  SET_USER_NEW_PLACE_FAILURE,
  SET_USER_NEW_PLACE_SUCCESS,
  SET_USER_ORDER_FAILURE,
  SET_USER_ORDER_PENDING,
  SET_USER_ORDER_SUCCESS,
  SET_USER_ORDERS_PENDING,
} from '../actions';

export const getOrdersAC = () => ({
  type: GET_USER_ORDERS_PENDING,
});

export const getOrdersSuccessAC = (data) => ({
  type: GET_USER_ORDERS_SUCCESS,
  payload: data,
});

export const getOrdersFailureAC = (error) => ({
  type: GET_USER_ORDERS_FAILURE,
  payload: error,
});

export const getBackupOrdersAC = () => ({
  type: GET_BACKUP_USER_ORDERS_PENDING,
});

export const getBackupOrdersFailureAC = (error) => ({
  type: GET_BACKUP_USER_ORDERS_FAILURE,
  payload: error,
});

export const setOrderAC = ({ count, coinId, price, date, place }) => ({
  type: SET_USER_ORDER_PENDING,
  payload: { count, coinId, price, date, place },
});

export const setOrderSuccessAC = (data) => ({
  type: SET_USER_ORDER_SUCCESS,
  payload: data,
});

export const setOrderFailureAC = (error) => ({
  type: SET_USER_ORDER_FAILURE,
  payload: error,
});

export const deleteOrderAC = (orderId) => ({
  type: DELETE_USER_ORDER_PENDING,
  payload: orderId,
});

export const deleteOrderSuccessAC = (orderId) => ({
  type: DELETE_USER_ORDER_SUCCESS,
  payload: orderId,
});

export const deleteOrderFailureAC = (error) => ({
  type: DELETE_USER_ORDER_FAILURE,
  payload: error,
});

export const setOrdersAC = (orders) => ({
  type: SET_USER_ORDERS_PENDING,
  payload: orders,
});

export const setNewPlaceAC = (place) => ({
  type: SET_USER_NEW_PLACE,
  payload: place,
});

export const setNewPlaceSuccessAC = (data) => ({
  type: SET_USER_NEW_PLACE_SUCCESS,
  payload: data,
});

export const setNewPlaceFailureAC = (error) => ({
  type: SET_USER_NEW_PLACE_FAILURE,
  payload: error,
});

export const getUserPlaceListAC = () => ({
  type: GET_USER_PLACE_LIST_PENDING,
});

export const getUserPlaceListSuccessAC = (data) => ({
  type: GET_USER_PLACE_LIST_SUCCESS,
  payload: data,
});

export const getUserPlaceListFailureAC = (error) => ({
  type: GET_USER_PLACE_LIST_FAILURE,
  payload: error,
});

export const handleCoinHoldPlaceAC = (value) => ({
  type: HANDLE_COIN_HOLD_PLACE,
  payload: value,
});
