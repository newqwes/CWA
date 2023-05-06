/**
 * @typedef {Object} RegistationRequestBody
 * @property {string} email
 * @property {string} login
 * @property {string} password
 */
export const REGISTRATION_REQUEST_BODY = {
  email: 'email',
  login: 'login',
  password: 'password',
  avatar: 'avatar',
  gender: 'gender',
};

/**
 * @typedef {Object} AuthorizationRequestBody
 * @property {string} email
 * @property {string} password
 */
export const AUTHORIZATION_REQUEST_BODY = {
  email: 'email',
  password: 'password',
};

/**
 * @typedef {Object} OrderRequestBody
 * @property {string} count
 * @property {string} coinId
 * @property {string} price
 * @property {string} date
 */
export const ORDER_REQUEST_BODY = {
  count: 'count',
  coinId: 'coinId',
  price: 'price',
  date: 'date',
};

export const LINK_REQUEST_PARAM = 'link';

export const GENDER_OBJ = {
  male: 'male',
  female: 'female'
};

export const GENDER = [null, GENDER_OBJ.male, GENDER_OBJ.female];
