import {
  DELETE_USER_SUCCESS,
  GET_USER_ORDERS_SUCCESS,
  HANDLE_COIN_HOLD_PLACE,
  SET_USER_ORDER_SUCCESS,
} from '../actions';

const initialState = {
  list: [],
  originList: [],
  coinHoldPlace: 'All',
};

const order = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_USER_ORDER_SUCCESS:
    case GET_USER_ORDERS_SUCCESS: {
      return { ...state, list: payload, originList: payload };
    }

    case DELETE_USER_SUCCESS: {
      return initialState;
    }

    case HANDLE_COIN_HOLD_PLACE: {
      return {
        ...state,
        coinHoldPlace: payload,
        list: state.originList.filter(
          ({ place }) => payload === 'All' || place === payload,
        ),
      };
    }

    default:
      return state;
  }
};

export default order;
