import jwt from 'jsonwebtoken';

/**
 * @param {Object} payload
 * @param {Object} payload.id userId
 * @param {Object} payload.login
 * @returns {Object}
 */
export const generateTokens = payload => {
  const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '60m' });
  const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '30d' });
  return {
    accessToken,
    refreshToken,
  };
};
