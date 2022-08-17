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

export const generateCoinCardsSuccessAC = coins => ({
  type: GENERATE_COIN_CARDS_SUCCESS,
  payload: coins,
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
