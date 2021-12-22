import { GET_USER_ORDERS_PENDING, SET_USER_ORDER_PENDING } from '../actions';

export const getOrdersAC = () => ({
  type: GET_USER_ORDERS_PENDING,
});

export const setOrderAC = ({ count, name, price, date }) => ({
  type: SET_USER_ORDER_PENDING,
  payload: { count, name, price, date },
});
