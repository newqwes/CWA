import { assoc, compose, pick } from 'lodash/fp';
import {
  AUTH_LOGOUT,
  DELETE_USER_FAILURE,
  DELETE_USER_SUCCESS,
  SET_USER_DATA,
  SET_USER_HISTORY,
} from '../actions';

const initialState = {
  email: '',
  login: '',
  userType: '',
  id: '',
  isActivated: false,
  list: [],
  history: [],
  prevData: {},
  score: 0,
  lastDateUpdate: '',
  dataRefreshLimitPerMinute: 0,
};

const user = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_USER_DATA: {
      const {
        email,
        login,
        userType,
        id,
        history,
        prevData,
        list,
        isActivated,
        score,
        lastDateUpdate,
        dataRefreshLimitPerMinute,
      } = pick(
        [
          'email',
          'login',
          'userType',
          'id',
          'history',
          'isActivated',
          'prevData',
          'score',
          'list',
          'lastDateUpdate',
          'dataRefreshLimitPerMinute',
        ],
        payload,
      );

      return compose(
        assoc(['history'], history),
        assoc(['email'], email),
        assoc(['list'], list),
        assoc(['prevData'], prevData),
        assoc(['login'], login),
        assoc(['userType'], userType),
        assoc(['id'], id),
        assoc(['isActivated'], isActivated),
        assoc(['score'], score),
        assoc(['lastDateUpdate'], lastDateUpdate),
        assoc(['dataRefreshLimitPerMinute'], dataRefreshLimitPerMinute),
      )(state);
    }

    case SET_USER_HISTORY: {
      return { ...state, history: payload };
    }
    case AUTH_LOGOUT:
    case DELETE_USER_SUCCESS: {
      return initialState;
    }

    case DELETE_USER_FAILURE: {
      return state;
    }

    default:
      return state;
  }
};

export default user;
