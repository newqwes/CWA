import { assoc } from 'lodash/fp';
import { GET_LOADING_PENDING, GET_LOADING_SUCCESS } from '../actions';

const initialState = {
  loading: false,
};

const aplication = (state = initialState, { type }) => {
  switch (type) {
    case GET_LOADING_SUCCESS: {
      return assoc(['loading'], false, state);
    }

    case GET_LOADING_PENDING: {
      return assoc(['loading'], true, state);
    }

    default:
      return state;
  }
};

export default aplication;
