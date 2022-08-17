import { assoc, compose, find, isEqual, map } from 'lodash/fp';
import { round } from 'lodash';

import { toNormalNumber } from '../utils/toNormalNumber';
import {
  GET_COIN_LIST_PENDING,
  GET_COIN_LIST_SUCCESS,
  GET_COIN_LIST_FAILURE,
  SELECT_COINS,
  GENERATE_COIN_CARDS_SUCCESS,
  CHANGE_BUDGET,
  CHANGE_GAP,
} from '../actions';

const initialState = {
  coins: [],
  loading: true,
  selectedCoins: [],
  showCards: false,
  budget: 200,
  gap: 5,
};

const calculator = (state = initialState, { type, payload }) => {
  switch (type) {
    case CHANGE_BUDGET: {
      return assoc(['budget'], payload, state);
    }

    case CHANGE_GAP: {
      return assoc(['gap'], payload, state);
    }

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
      const selectedCoins = map.convert({ cap: false })(({ id }, key) => {
        const rawCoin = find(coin => isEqual(coin.id, id), payload);

        let multiplier = Math.floor(state.selectedCoins.length / 2) - key;

        if (!(state.selectedCoins.length % 2) && multiplier > 0) {
          multiplier -= 1;
        }
        const ammount = state.budget / state.selectedCoins.length + multiplier * state.gap;

        return {
          id,
          label: rawCoin.name,
          src: rawCoin.image,
          price: toNormalNumber(rawCoin.current_price),
          priceChange: round(rawCoin.price_change_percentage_24h, 2),
          ammount: round(ammount, 2),
        };
      }, state.selectedCoins);

      return compose(assoc(['selectedCoins'], selectedCoins), assoc(['showCards'], true))(state);
    }

    default:
      return state;
  }
};

export default calculator;
