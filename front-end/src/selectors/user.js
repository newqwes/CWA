import { get } from 'lodash/fp';
import { createSelector } from 'reselect';

const localState = get('user');

export const getLastDateUpdate = createSelector(localState, get('lastDateUpdate'));
export const getScore = createSelector(localState, get('score'));
export const getDataRefreshLimitPerMinute = createSelector(
  localState,
  get('dataRefreshLimitPerMinute'),
);
