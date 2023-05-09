import {
  CLOSE_AUTHORIZATION_MODALS,
  GET_LOADING_PENDING,
  GET_LOADING_SUCCESS,
  HANDLE_COLLAPSE_SIDE_MENU,
  HANDLE_SHOW_AUTH_MODAL,
  HANDLE_SHOW_REGISTRATION_MODAL,
  SET_BANK_VALUE,
  SET_NOTIFICATION,
  SET_NOTIFICATION_FORM,
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

export const closeAuthorizationModalsAC = () => ({
  type: CLOSE_AUTHORIZATION_MODALS,
});

export const setBankValueAC = (payload) => ({
  type: SET_BANK_VALUE,
  payload,
});
