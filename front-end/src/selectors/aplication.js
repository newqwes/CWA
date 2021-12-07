import { get } from 'lodash/fp';
import { createSelector } from 'reselect';

const localState = get('aplication');

export const isLoading = createSelector(localState, get('loading'));

export const getCollapsedSideMenu = createSelector(localState, get('collapsedSideMenu'));

export const isAuthModalVisible = createSelector(localState, get('authModalVisible'));

export const isRegistrationModalVisible = createSelector(
  localState,
  get('registrationModalVisible'),
);
