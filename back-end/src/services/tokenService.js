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
    const { id } = data;

    const accessToken = jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '30m',
    });

    const refreshToken = jwt.sign({ id }, process.env.ACCESS_REFRESH_SECRET, {
      expiresIn: '30m',
    });

    const dataWithToken = {
      ...data,
      refreshToken,
      accessToken: `Bearer ${accessToken}`,
    };

    return dataWithToken;
  }

  /**
   * @description Returns the user data including password
   * @param {Object} userData - ready user data
   * @param {string} password - new password entered by the user
   * @returns {Object}
   */
  setUserDataWithPassword(userData, password) {
    const salt = bcrypt.genSaltSync();

    const hashPassword = bcrypt.hashSync(password, salt);

    const activationLink = v4();

    const userDataWithPassword = {
      ...userData,
      activationLink,
      password: hashPassword,
    };

    return userDataWithPassword;
  }

  async saveToken({ id, refreshToken }) {
    const tokenData = await Token.findOne({ where: { userId: id } });

    if (tokenData) {
      return Token.update(
        { refreshToken },
        { where: { userId: id }, returning: true, plain: true },
      );
    }

    return Token.create({ userId: id, refreshToken });
  }
}

export default new TokenService();
