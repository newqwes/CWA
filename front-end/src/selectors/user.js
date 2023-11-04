import { get } from 'lodash/fp';
import { createSelector } from 'reselect';

const localState = get('user');

export const getLastDateUpdate = createSelector(localState, get('lastDateUpdate'));
export const getScore = createSelector(localState, get('score'));
export const getUserId = createSelector(localState, get('id'));
export const getLogin = createSelector(localState, get('login'));
export const getDataRefreshLimitPerMinute = createSelector(
  localState,
  get('dataRefreshLimitPerMinute'),
);

export const getUserLastPriceList = createSelector(localState, get('list'));
export const getUserPrevData = createSelector(localState, get('prevData'));

export const getPrevGridRowData = createSelector(getUserPrevData, get('gridRowData'));
export const getUserHistory = createSelector(localState, get('history'));
export const getUserList = createSelector(localState, get('userList'));
export const getAvatarURL = createSelector(localState, get('avatarURL'));
export const getEmail = createSelector(localState, get('email'));
export const getPlaceList = createSelector(localState, get('placeList'));
