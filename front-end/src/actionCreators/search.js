import {
  GET_COIN_LIST_FAILURE,
  GET_COIN_LIST_PENDING,
  GET_COIN_LIST_SUCCESS,
  SELECT_COINS,
  GENERATE_COIN_CARDS,
  GENERATE_COIN_CARDS_SUCCESS,
  GENERATE_COIN_CARDS_FAILURE,
  CHANGE_BUDGET,
  CHANGE_GAP,
  CHANGE_IS_PERCENT, CHANGE_LIST_PERCENT,
} from '../actions';

export const getCoinListAC = value => ({
  type: GET_COIN_LIST_PENDING,
  payload: value,
});

export const getCoinListSuccessAC = coins => ({
  type: GET_COIN_LIST_SUCCESS,
  payload: coins,
});

export const getCoinListFailureAC = () => ({
  type: GET_COIN_LIST_FAILURE,
});

export const selectCoinsAC = values => ({
  type: SELECT_COINS,
  payload: values,
});

export const generateCoinCardsAC = () => ({
  type: GENERATE_COIN_CARDS,
});

export const generateCoinCardsSuccessAC =
  ({ coins, gridRowData, listPercentOptions }) => ({
  type: GENERATE_COIN_CARDS_SUCCESS,
  payload: { coins, gridRowData, listPercentOptions },
});

export const generateCoinCardsFailureAC = () => ({
  type: GENERATE_COIN_CARDS_FAILURE,
});

export const changeBudgetAC = value => ({
  type: CHANGE_BUDGET,
  payload: value,
});

export const changeGapAC = value => ({
  type: CHANGE_GAP,
  payload: value,
});

export const changeIsPercentAC = () => ({
  type: CHANGE_IS_PERCENT,
});

export const handleChangeListPercentAC = value => ({
  type: CHANGE_LIST_PERCENT,
  payload: value,
});
