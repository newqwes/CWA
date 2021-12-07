import {
  GET_LOADING_PENDING,
  GET_LOADING_SUCCESS,
  HANDLE_COLLAPSE_SIDE_MENU,
  SET_NOTIFICATION_FORM,
  HANDLE_SHOW_AUTH_MODAL,
  HANDLE_SHOW_REGISTRATION_MODAL,
} from '../actions';

export const loadingPending = () => ({
  type: GET_LOADING_PENDING,
});

export const loadingSuccess = () => ({
  type: GET_LOADING_SUCCESS,
});

export const handleCollapseSideMenu = () => ({
  type: HANDLE_COLLAPSE_SIDE_MENU,
});

export const setNotificationForm = ({ errorFields }) => ({
  type: SET_NOTIFICATION_FORM,
  payload: errorFields,
});

export const handleShowAuthModal = () => ({
  type: HANDLE_SHOW_AUTH_MODAL,
});

export const handleShowRegistrationModal = () => ({
  type: HANDLE_SHOW_REGISTRATION_MODAL,
});
