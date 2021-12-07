import { toString } from 'lodash/fp';
import { AUTH_TOKEN } from '../constants/authModal';

/**
 * @description Returns token from sessionStorage if the user is authorized
 * @returns {string|null} token
 */
export const getToken = () => {
  const token = sessionStorage.getItem(AUTH_TOKEN);

  return token;
};

export const setSession = (fieldName, value) => {
  console.log('fieldName', fieldName);
  console.log('value', value);

  sessionStorage.setItem(toString(fieldName), toString(value));
};
