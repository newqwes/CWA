import {
  DELETE_USER_DATA_SUCCESS,
  GET_USER_ORDERS_SUCCESS,
  SET_USER_ORDER_SUCCESS,
} from '../actions';

const initialState = {
  list: [],
};

const order = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_USER_ORDER_SUCCESS:
    case GET_USER_ORDERS_SUCCESS: {
      return { ...state, list: payload };
    }

    case DELETE_USER_DATA_SUCCESS: {
      return initialState;
    }

    default:
      return state;
  }
};

export default order;
