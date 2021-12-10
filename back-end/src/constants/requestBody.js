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
