import bcrypt from 'bcrypt';

import User from '../database/models/user';
import ApiError from '../exceptions/apiError';
import UserDto from '../dto/userDto';

import createResponse from '../utils/createResponse';
import { parseUserData } from '../utils/user';
import { generateTokens } from '../utils/token';

import tokenService from './tokenService';
import userService from './userService';
import mailService from './mailService';

class AuthService {
  /**
   * @param {import('../constants/requestBody.js').AuthorizationRequestBody} authorizationBody
   * @returns {Object} user data form database without password
   */
  async login({ email, password }) {
    const user = await userService.findByEmail(email);

    if (user) {
      throw ApiError.BadRequest(`Пользователь с почтовым адресом ${email} уже существует`);
    }

    const { password: hashPassword } = user;

    const passwordEqual = bcrypt.compareSync(password, hashPassword);

    if (!passwordEqual) {
      throw ApiError.BadRequest('Неверный пароль');
    }

    // TODO: check dto parser data from DB
    const userDto = new UserDto(user);
    const userData = { ...userDto };

    const tokens = generateTokens(userData);

    await tokenService.saveToken({
      userId: userData.id,
      refreshToken: tokens.refreshToken,
    });

    return { ...userData, ...tokens };
  }

  /**
   * @param {import('../constants/requestBody.js').RegistationRequestBody} registationBody
   * @returns {Object} user data form database without password
   */
  async create(registationBody) {
    const { email } = registationBody;

    const foundUser = await userService.findByEmail(email);

    if (foundUser) {
      return createResponse(409, 'email already exists!');
    }

    const userDataWithHashPassword = parseUserData(registationBody);

    const user = await User.create(userDataWithHashPassword);

    const userDto = new UserDto(user);
    const userData = { ...userDto };

    await mailService.sendActivationMail(userData.email, userDataWithHashPassword.activationLink);

    const tokens = generateTokens({ id: userData.login, login: userData.login });

    await tokenService.saveToken({
      userId: userData.id,
      refreshToken: tokens.refreshToken,
    });

    return { ...userData, ...tokens };
  }
}

export default new AuthService();
