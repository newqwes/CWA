import { get } from 'lodash/fp';
import { createSelector } from 'reselect';

const localState = get('user');

export const getLastDateUpdate = createSelector(localState, get('lastDateUpdate'));
export const getScore = createSelector(localState, get('score'));
export const getLogin = createSelector(localState, get('login'));
export const getDataRefreshLimitPerMinute = createSelector(
  localState,
  get('dataRefreshLimitPerMinute'),
);

export const getUserLastPriceList = createSelector(localState, get('list'));
export const getUserPrevData = createSelector(localState, get('prevData'));
