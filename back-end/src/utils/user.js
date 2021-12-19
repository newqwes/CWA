import { getOr, omit } from 'lodash/fp';
import bcrypt from 'bcrypt';
import { v4 } from 'uuid';

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
  const userData = omit(['password', 'id', 'userType'], body);

  return userData;
};

/**
 * @param {import('../constants/requestBody.js').RegistationRequestBody} registationBody
 * @returns {Object} user data form database without password
 */
export const parseUserData = registationBody => {
  const salt = bcrypt.genSaltSync();

  const hashPassword = bcrypt.hashSync(registationBody.password, salt);

  const activationHash = v4();

  const userDataWithHashPassword = {
    ...registationBody,
    activationHash,
    password: hashPassword,
  };

  return userDataWithHashPassword;
};

/**
 * @description
 * @param {Object} googleProfile
 * @param {string} googleProfile.email
 * @param {string} googleProfile.name
 * @returns {Object} { defaults, randomPassword }
 */
export const createUserDataByGoogle = ({ email, displayName }) => {
  const randomPassword = v4();

  const registationBody = {
    email,
    login: displayName,
    password: randomPassword,
    isActivated: true,
  };

  const defaults = parseUserData(registationBody);

  return { defaults, randomPassword };
};
