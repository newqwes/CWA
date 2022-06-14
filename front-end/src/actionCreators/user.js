import { DELETE_USER_DATA, SET_USER_DATA, SET_USER_HISTORY } from '../actions';

export const setUserDataAC = payload => ({
  type: SET_USER_DATA,
  payload,
});

export const setUserHistoryAC = payload => ({
  type: SET_USER_HISTORY,
  payload,
});

export const deleteUserDataAC = () => ({
  type: DELETE_USER_DATA,
});
