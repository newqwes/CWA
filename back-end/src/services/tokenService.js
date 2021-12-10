import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { v4 } from 'uuid';

import Token from '../database/models/token';

class TokenService {
  /**
   * @description Returns the user data including token
   * @param {Object} data - ready user data
   * @returns {Object}
   */
  setUserDataWithToken(data) {
    const { id, login } = data;

    const accessToken = jwt.sign({ id, login }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '30m',
    });

    const refreshToken = jwt.sign({ id, login }, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: '30d',
    });

    const dataWithToken = {
      ...data,
      refreshToken,
      accessToken: `Bearer ${accessToken}`,
    };

    return dataWithToken;
  }

  /**
   * @param {import('../constants/requestBody.js').RegistationRequestBody} registerBody
   * @returns {Object} user data form database without password
   */
  setUserDataWithPassword(registerBody) {
    const salt = bcrypt.genSaltSync();

    const hashPassword = bcrypt.hashSync(registerBody.password, salt);

    const activationLink = v4();

    const userDataWithHashPassword = {
      ...registerBody,
      activationLink,
      password: hashPassword,
    };

    return userDataWithHashPassword;
  }

  async saveToken({ userId, refreshToken }) {
    const tokenData = await Token.findOne({ where: { userId } });

    if (tokenData) {
      return Token.update({ refreshToken }, { where: { userId }, returning: true, plain: true });
    }

    return Token.create({ userId, refreshToken });
  }
}

export default new TokenService();
