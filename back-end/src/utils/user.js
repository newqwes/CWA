import { getOr, omit } from 'lodash/fp';
import bcrypt from 'bcrypt';
import { v4 } from 'uuid';
import { GENDER } from '../constants/requestBody';
import UserDto from '../dto/userDto';

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

export const getGender = req => {
  const gender = getOr(null, ['query', 'gender'], req);

  if (GENDER.includes(gender)) {
    return gender;
  }
  return null;
};

export const prepareUserList = users => users.map((user) => {
  const rawUser = new UserDto(user);

  if (!rawUser.id) return {};

  return {
    id: rawUser.id,
    avatarURL: rawUser.avatarURL,
    gender: rawUser.gender,
    lastDateUpdate: rawUser.lastDateUpdate,
    list: rawUser.list,
    login: rawUser.login,
    score: rawUser.score,
    level: rawUser.level,
    userType: rawUser.userType,
    profit: rawUser.prevData && rawUser.prevData.netProfit
  };
});
