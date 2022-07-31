import { assoc, compose, map } from 'lodash/fp';
import {
  GET_COIN_LIST_PENDING,
  GET_COIN_LIST_SUCCESS,
  GET_COIN_LIST_FAILURE,
  SELECT_COINS,
  GENERATE_COIN_CARDS_SUCCESS,
} from '../actions';

const initialState = {
  coins: [],
  loading: true,
  selectedCoins: [],
  showCards: false,
};

const calculator = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_COIN_LIST_SUCCESS: {
      return compose(assoc(['coins'], payload), assoc(['loading'], false))(state);
    }

    case GET_COIN_LIST_PENDING: {
      return compose(assoc(['coins'], []), assoc(['loading'], true))(state);
    }

    case GET_COIN_LIST_FAILURE: {
      return compose(assoc(['coins'], []), assoc(['loading'], false))(state);
    }

    case SELECT_COINS: {
      const selectedCoins = map(id => ({ id }), payload);

      return assoc(['selectedCoins'], selectedCoins, state);
    }

    case GENERATE_COIN_CARDS_SUCCESS: {
      const selectedCoins = map(
        // eslint-disable-next-line camelcase
        ({ id, name, image, current_price, price_change_percentage_24h }) => ({
          id,
          label: name,
          src: image,
          price: current_price,
          priceChange: price_change_percentage_24h,
        }),
        payload,
      );

      return compose(assoc(['selectedCoins'], selectedCoins), assoc(['showCards'], true))(state);
    }

    default:
      return state;
  }
};

export default calculator;
