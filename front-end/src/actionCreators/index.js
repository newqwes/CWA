import { GET_LOADING_PENDING, GET_LOADING_SUCCESS } from '../actions';

export const loadingPending = () => ({
  type: GET_LOADING_PENDING,
});

export const loadingSuccess = () => ({
  type: GET_LOADING_SUCCESS,
});
