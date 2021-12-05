import { toString } from 'lodash/fp';
import { AUTH_TOKEN } from '../constants/authModal';

/**
 * @description Returns token from localStorage if the user is authorized
 * @returns {string|null} token
 */
export const getToken = () => {
  const token = localStorage.getItem(AUTH_TOKEN);

  return token;
};

export const setSession = (fieldName, value) => {
  localStorage.setItem(toString(fieldName), toString(value));
};
