import { HANDLE_REFRESH, HANDLE_REFRESH_FAILURE, HANDLE_REFRESH_SUCCESS } from '../actions';

export const handleRefreshAC = () => ({
  type: HANDLE_REFRESH,
});

export const handleRefreshFailureAC = error => ({
  type: HANDLE_REFRESH_FAILURE,
  payload: error,
});

export const handleRefreshSuccessAC = data => ({
  type: HANDLE_REFRESH_SUCCESS,
  payload: data,
});
