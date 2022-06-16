import {
  DELETE_USER_FAILURE,
  DELETE_USER_PENDING,
  DELETE_USER_SUCCESS,
  SET_USER_DATA,
  SET_USER_HISTORY,
} from '../actions';

export const setUserDataAC = payload => ({
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
