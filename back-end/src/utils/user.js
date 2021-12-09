import { getOr } from 'lodash/fp';

import { omit } from 'lodash';

import { extractDataFromResponseDB } from './extractData';

/**
 * @description Returns the user id if authorized else return null
 * @param {Object} req - receive a request from the user
 * @returns {(string|null)}
 */
export const getUserId = req => getOr(null, ['user', 'id'], req);

/**
 * @description Returns creates secure user data to write to the database
 * @param {Object} body - new entered user data
 * @returns {Object}
 */
export const createUserData = body => {
  const userData = omit(body, ['password', 'id', 'type']);

  return userData;
};

/**
 * @description Returns parses the object in such a way that there is no password in the response
 * @param {Object} userData - data came from database
 * @returns {Object}
 */
export const createResponseUserData = userData => {
  const extractedData = extractDataFromResponseDB(userData);

  const responseUserData = omit(extractedData, 'password');

  return responseUserData;
};
