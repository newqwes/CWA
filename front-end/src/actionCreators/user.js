import {
  DELETE_USER_FAILURE,
  DELETE_USER_PENDING,
  DELETE_USER_SUCCESS,
  GET_USER_LIST_FAILURE,
  GET_USER_LIST_PENDING,
  GET_USER_LIST_SUCCESS,
  SET_USER_DATA,
  SET_USER_HISTORY,
} from '../actions';

export const setUserDataAC = (payload) => ({
  type: SET_USER_DATA,
  payload,
});

export const setUserHistoryAC = payload => ({
  type: SET_USER_HISTORY,
  payload,
});

export const deleteUserAC = () => ({
  type: DELETE_USER_PENDING,
});

export const deleteUserSuccessAC = () => ({
  type: DELETE_USER_SUCCESS,
});

export const deleteUserFailureAC = () => ({
  type: DELETE_USER_FAILURE,
});

export const getUserListAC = () => ({
  type: GET_USER_LIST_PENDING,
});

export const getUserListSuccessAC = users => ({
  type: GET_USER_LIST_SUCCESS,
  payload: users,
});

export const getUserListFailureAC = () => ({
  type: GET_USER_LIST_FAILURE,
});
