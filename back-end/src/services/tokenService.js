import jwt from 'jsonwebtoken';
import Token from '../database/models/token';

class TokenService {
  async saveToken({ userId, refreshToken }) {
    const tokenData = await Token.findOne({ where: { userId } });

    if (tokenData) {
      return Token.update({ refreshToken }, { where: { userId }, returning: true, plain: true });
    }

    return Token.create({ userId, refreshToken });
  }

  validateAccessToken(token) {
    try {
      const userData = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

      return userData;
    } catch (e) {
      return null;
    }
  }

  validateRefreshToken(token) {
    try {
      const userData = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

      return userData;
    } catch (e) {
      return null;
    }
  }

  async removeToken(refreshToken) {
    const tokenData = await Token.deleteOne({ refreshToken });

    return tokenData;
  }

  async findToken(refreshToken) {
    const tokenData = await Token.findOne({ refreshToken });

    return tokenData;
  }
}

export default new TokenService();
