import { SET_USER_DATA } from '../actions';

export const setUserDataAC = payload => ({
  type: SET_USER_DATA,
  payload,
});
