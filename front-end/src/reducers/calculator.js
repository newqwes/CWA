import { assoc, compose, find, isEqual, map } from 'lodash/fp';
import { round, sumBy } from 'lodash';

import { toNormalNumber } from '../utils/toNormalNumber';
import {
  CHANGE_BUDGET,
  CHANGE_GAP,
  CHANGE_IS_PERCENT,
  CHANGE_LIST_PERCENT,
  GENERATE_COIN_CARDS_SUCCESS,
  GET_COIN_LIST_FAILURE,
  GET_COIN_LIST_PENDING,
  GET_COIN_LIST_SUCCESS,
  SELECT_COINS,
} from '../actions';

const initialState = {
  coins: [],
  loading: true,
  selectedCoins: [
    { id: 'cosmos' },
    { id: 'hedera-hashgraph' },
    { id: 'matic-network' },
    { id: 'elrond-erd-2' },
    { id: 'algorand' },
    { id: 'avalanche-2' },
    { id: 'near' },
    { id: 'aptos' },
    { id: 'solana' },
    { id: 'arbitrum' },
    { id: 'polkadot' },
    { id: 'sui' },
    { id: 'zilliqa' },
    { id: 'compound-governance-token' },
    { id: 'filecoin' },
    { id: 'internet-computer' },
    { id: 'dash' },
    { id: 'chainlink' },
    { id: 'stellar' },
    { id: 'ethereum-classic' },
    { id: 'ripple' },
    { id: 'ethereum' },
    { id: 'iota' },
    { id: 'cardano' },
    { id: 'binancecoin' },
    { id: 'the-graph' },
    { id: 'helium' },
    { id: 'immutable-x' },
    { id: 'siacoin' },
  ],
  showCards: false,
  budget: 300,
  gap: 5,
  isPercent: true,
  listPercentOptions: [
    { value: '10.1' },
    { value: '9.9' },
    { value: '7' },
    { value: '6.1' },
    { value: '6' },
    { value: '5.9' },
    { value: '5' },
    { value: '4.2' },
    { value: '4.1' },
    { value: '4' },
    { value: '3.9' },
    { value: '3.8' },
    { value: '3' },
    { value: '3.1' },
    { value: '3' },
    { value: '2.9' },
    { value: '2' },
    { value: '2.2' },
    { value: '2.1' },
    { value: '1.9' },
    { value: '1.8' },
    { value: '1.4' },
    { value: '1.3' },
    { value: '1.2' },
    { value: '1.1' },
    { value: '0.9' },
    { value: '0.8' },
    { value: '0.7' },
    { value: '0.6' },
  ],
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
      return compose(
        assoc(['coins'], payload),
        assoc(['loading'], false),
      )(state);
    }

    case GET_COIN_LIST_PENDING: {
      return compose(assoc(['coins'], []), assoc(['loading'], true))(state);
    }

    case GET_COIN_LIST_FAILURE: {
      return compose(assoc(['coins'], []), assoc(['loading'], false))(state);
    }

    case SELECT_COINS: {
      const selectedCoins = map((id) => ({ id }), payload);

      return assoc(['selectedCoins'], selectedCoins, state);
    }

    case CHANGE_IS_PERCENT: {
      return assoc(['isPercent'], !state.isPercent, state);
    }

    case CHANGE_LIST_PERCENT: {
      const selectedPercent = map((value) => ({ value }), payload);

      return assoc(['listPercentOptions'], selectedPercent, state);
    }

    case GENERATE_COIN_CARDS_SUCCESS: {
      let selectedCoins = map.convert({ cap: false })(({ id }, key) => {
        const rawCoin = find((coin) => isEqual(coin.id, id), payload.coins);

        let multiplier = Math.floor(state.selectedCoins.length / 2) - key;

        if (!(state.selectedCoins.length % 2) && multiplier > 0) {
          multiplier -= 1;
        }
        const amount =
          state.budget / state.selectedCoins.length + multiplier * state.gap;

        return {
          id,
          label: rawCoin.name,
          src: rawCoin.image,
          price: toNormalNumber(rawCoin.current_price),
          priceChange: round(
            rawCoin.price_change_percentage_30d_in_currency,
            2,
          ),
          amount: round(amount, 3),
        };
      }, state.selectedCoins);

      if (state.isPercent) {
        const totalSum =
          sumBy(payload.gridRowData, 'totalBuyActual') + state.budget;

        const selectedCoinsSum = state.selectedCoins.map(({ id }, index) => {
          const coinSum = sumBy(
            payload.gridRowData.filter(({ coinId }) => coinId === id),
            'totalBuyActual',
          );

          const coinPercentTotal =
            state.listPercentOptions[index].value - (coinSum * 100) / totalSum;

          const coinPercentGlobal = coinPercentTotal < 0 ? 0 : coinPercentTotal;

          const rawCoin = find((coin) => isEqual(coin.id, id), payload.coins);
          return { coinPercentGlobal, rawCoin, id };
        });
        const coinsSumGlobal = sumBy(selectedCoinsSum, 'coinPercentGlobal');

        selectedCoins = selectedCoinsSum.map(
          ({ coinPercentGlobal, id, rawCoin }) => {
            const amount =
              (((coinPercentGlobal * 100) / coinsSumGlobal) * state.budget) /
              100;
            return {
              id,
              label: rawCoin.name,
              src: rawCoin.image,
              price: toNormalNumber(rawCoin.current_price),
              priceChange: round(
                rawCoin.price_change_percentage_30d_in_currency,
                2,
              ),
              amount: amount < 0 ? 0 : round(amount, 1),
            };
          },
        );
      }

      return compose(
        assoc(['selectedCoins'], selectedCoins),
        assoc(['showCards'], true),
      )(state);
    }

    default:
      return state;
  }
};

export default calculator;
