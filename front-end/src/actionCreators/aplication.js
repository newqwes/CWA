import {
  GET_LOADING_PENDING,
  GET_LOADING_SUCCESS,
  HANDLE_COLLAPSE_SIDE_MENU,
  SET_NOTIFICATION_FORM,
  HANDLE_SHOW_AUTH_MODAL,
  HANDLE_SHOW_REGISTRATION_MODAL,
  SET_NOTIFICATION,
} from '../actions';

export const loadingPendingAC = () => ({
  type: GET_LOADING_PENDING,
});

export const loadingSuccessAC = () => ({
  type: GET_LOADING_SUCCESS,
});

export const handleCollapseSideMenuAC = () => ({
  type: HANDLE_COLLAPSE_SIDE_MENU,
});

export const setNotificationFormAC = ({ errorFields }) => ({
  type: SET_NOTIFICATION_FORM,
  payload: errorFields,
});

export const setNotificationAC = payload => ({
  type: SET_NOTIFICATION,
  payload,
});

export const handleShowAuthModalAC = () => ({
  type: HANDLE_SHOW_AUTH_MODAL,
});

export const handleShowRegistrationModalAC = () => ({
  type: HANDLE_SHOW_REGISTRATION_MODAL,
});
