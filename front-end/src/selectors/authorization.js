import { get } from 'lodash/fp';
import { createSelector } from 'reselect';

const localState = get('authorization');

export const isAuthorized = createSelector(localState, get('authorized'));
