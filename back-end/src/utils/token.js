import jwt from 'jsonwebtoken';

/**
 * @param {Object} payload
 * @param {Object} payload.id userId
 * @param {Object} payload.email
 * @returns {Object}
 */
export const generateTokens = ({ email, id }) => {
  const accessToken = jwt.sign({ email, id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '60m',
  });
  const refreshToken = jwt.sign({ email, id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: '30d',
  });

  return {
    accessToken,
    refreshToken,
  };
};
