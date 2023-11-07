import { get } from 'lodash/fp';
import { createSelector } from 'reselect';

const localState = get('calculator');

export const isLoading = createSelector(localState, get('loading'));
export const getSelectedCoins = createSelector(localState, get('selectedCoins'));
export const getCoins = createSelector(localState, get('coins'));
export const isShowCards = createSelector(localState, get('showCards'));
export const getBudget = createSelector(localState, get('budget'));
export const getGap = createSelector(localState, get('gap'));
export const isPercent = createSelector(localState, get('isPercent'));
export const getListPercentOptions = createSelector(localState, get('listPercentOptions'));
