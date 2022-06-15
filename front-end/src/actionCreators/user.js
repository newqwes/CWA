import {
  DELETE_USER_DATA_FAILURE,
  DELETE_USER_DATA_PENDING,
  DELETE_USER_DATA_SUCCESS,
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

export const deleteUserDataAC = () => ({
  type: DELETE_USER_DATA_PENDING,
});

export const deleteUserDataSuccessAC = () => ({
  type: DELETE_USER_DATA_SUCCESS,
});

export const deleteUserDataFailureAC = () => ({
  type: DELETE_USER_DATA_FAILURE,
});
