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
  const userData = omit(['password', 'id', 'type'], body);

  return userData;
};

/**
 * @param {import('../constants/requestBody.js').RegistationRequestBody} registationBody
 * @returns {Object} user data form database without password
 */
export const parseUserData = registationBody => {
  const salt = bcrypt.genSaltSync();

  const hashPassword = bcrypt.hashSync(registationBody.password, salt);

  const activationLink = `${process.env.API_URL}/api/activate/${v4()}`;

  console.log(activationLink);

  const userDataWithHashPassword = {
    ...registationBody,
    activationLink,
    password: hashPassword,
  };

  return userDataWithHashPassword;
};
