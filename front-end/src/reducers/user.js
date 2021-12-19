import { assoc, compose, pick } from 'lodash/fp';
import { SET_USER_DATA } from '../actions';

const initialState = {
  email: '',
  login: '',
  userType: '',
  id: '',
  isActivated: false,
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
          'isActivated',
          'score',
          'lastDateUpdate',
          'dataRefreshLimitPerMinute',
        ],
        payload,
      );
      console.log(payload);
      return compose(
        assoc(['email'], email),
        assoc(['login'], login),
        assoc(['userType'], userType),
        assoc(['id'], id),
        assoc(['isActivated'], isActivated),
        assoc(['score'], score),
        assoc(['lastDateUpdate'], lastDateUpdate),
        assoc(['dataRefreshLimitPerMinute'], dataRefreshLimitPerMinute),
      )(state);
    }

    default:
      return state;
  }
};

export default user;
