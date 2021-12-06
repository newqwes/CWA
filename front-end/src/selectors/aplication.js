import { get } from 'lodash/fp';
import { createSelector } from 'reselect';

const localState = get('aplication');

export const getLoading = createSelector(localState, get('loading'));
