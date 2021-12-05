import { getOr } from 'lodash/fp';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { omit } from 'lodash';

import { extractDataFromResponseDB } from './extractData';

/**
 * @description Returns the user id if authorized else return null
 * @param {Object} req - receive a request from the user
 * @returns {(string|null)}
 */
export const getUserId = req => getOr(null, ['user', 'id'], req);

/**
 * @description Returns the user data including token
 * @param {Object} data - ready user data
 * @returns {Object}
 */
export const setUserDataWithToken = data => {
  const token = jwt.sign({ id: data.id }, process.env.ACCESS_TOKEN_SECRET);

  const dataWithToken = {
    ...data,
    token: `Bearer ${token}`,
  };

  return dataWithToken;
};

/**
 * @description Returns the user data including password
 * @param {Object} userData - ready user data
 * @param {string} password - new password entered by the user
 * @returns {Object}
 */
export const setUserDataWithPassword = (userData, password) => {
  const salt = bcrypt.genSaltSync();

  const hashPassword = bcrypt.hashSync(password, salt);

  const userDataWithPassword = {
    ...userData,
    password: hashPassword,
  };

  return userDataWithPassword;
};

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
