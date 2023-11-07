import { takeEvery, all, call, put, select } from 'redux-saga/effects';

import { map } from 'lodash/fp';
import { GENERATE_COIN_CARDS, GET_COIN_LIST_PENDING } from '../actions';

import { coingeckoAPI } from '../api';
import {
  getCoinListFailureAC,
  getCoinListSuccessAC,
  generateCoinCardsSuccessAC,
  generateCoinCardsFailureAC,
} from '../actionCreators/search';
import { getListPercentOptions, getSelectedCoins } from '../selectors/calculator';
import { getGridRowData } from '../selectors/order';

function* getCoinList({ payload }) {
  try {
    const coins = yield call(coingeckoAPI.searchCoin, payload);

    yield put(getCoinListSuccessAC(coins));
  } catch (error) {
    yield put(getCoinListFailureAC());
  }
}

function* generateCoinCards() {
  try {
    const selectedCoins = yield select(getSelectedCoins);

    const coins = yield call(
      coingeckoAPI.getCoinData,
      map(({ id }) => id, selectedCoins),
    );
    const gridRowData = yield select(getGridRowData);
    const listPercentOptions = yield select(getListPercentOptions);

    yield put(generateCoinCardsSuccessAC(
      { coins, gridRowData, listPercentOptions },
    ));
  } catch (error) {
    yield put(generateCoinCardsFailureAC());
  }
}

export function searchSaga() {
  return all([
    takeEvery(GET_COIN_LIST_PENDING, getCoinList),
    takeEvery(GENERATE_COIN_CARDS, generateCoinCards),
  ]);
}
