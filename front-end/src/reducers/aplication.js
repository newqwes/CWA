import { assoc, compose } from 'lodash/fp';
import {
  AUTH_SUCCESS,
  CLOSE_AUTHORIZATION_MODALS,
  GET_LOADING_PENDING,
  GET_LOADING_SUCCESS,
  HANDLE_COLLAPSE_SIDE_MENU,
  HANDLE_SHOW_AUTH_MODAL,
  HANDLE_SHOW_REGISTRATION_MODAL,
  REGISTRATION_SUCCESS,
  SET_BANK_VALUE,
} from '../actions';

const initialState = {
  loading: true,
  collapsedSideMenu: true,
  authModalVisible: false,
  registrationModalVisible: false,
  bank: 0,
};

const aplication = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_LOADING_SUCCESS: {
      return assoc(['loading'], false, state);
    }

    case GET_LOADING_PENDING: {
      return assoc(['loading'], true, state);
    }

    case HANDLE_COLLAPSE_SIDE_MENU: {
      return assoc(['collapsedSideMenu'], !state.collapsedSideMenu, state);
    }

    case HANDLE_SHOW_AUTH_MODAL: {
      return assoc(['authModalVisible'], !state.authModalVisible, state);
    }

    case HANDLE_SHOW_REGISTRATION_MODAL: {
      return assoc(['registrationModalVisible'], !state.registrationModalVisible, state);
    }

    case REGISTRATION_SUCCESS: {
      return assoc(['registrationModalVisible'], false, state);
    }

    case AUTH_SUCCESS: {
      return assoc(['authModalVisible'], false, state);
    }

    case CLOSE_AUTHORIZATION_MODALS: {
      return compose(
        assoc(['authModalVisible'], false),
        assoc(['registrationModalVisible'], false),
      )(state);
    }

    case SET_BANK_VALUE: {
      return assoc(['bank'], payload, state);
    }

    default:
      return state;
  }
};

export default aplication;
