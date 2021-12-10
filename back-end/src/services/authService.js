import bcrypt from 'bcrypt';

import User from '../database/models/user';

import createResponse from '../utils/createResponse';
import { createResponseUserData } from '../utils/user';

import tokenService from './tokenService';
import userService from './userService';
import mailService from './mailService';

class AuthService {
  async login({ email, password }) {
    const foundUser = await userService.findByEmail(email);

    if (!foundUser) {
      return createResponse(401, 'Incorrect email or password!');
    }

    const { password: userPassword } = foundUser;

    const isPasswordEqual = bcrypt.compareSync(password, userPassword);

    if (isPasswordEqual) {
      const responseUserData = createResponseUserData(foundUser);
      const responseUserDataWithToken = tokenService.setUserDataWithToken(responseUserData);

      return createResponse(200, 'Successfully!', responseUserDataWithToken);
    }

    return createResponse(401, 'Incorrect email or password!');
  }

  /**
   * @param {import('../constants/requestBody.js').RegistationRequestBody} registerBody
   * @returns {Object} user data form database without password
   */
  async create(registerBody) {
    const { email } = registerBody;

    const foundUser = await userService.findByEmail(email);

    if (foundUser) {
      return createResponse(409, 'email already exists!');
    }

    const userDataWithHashPassword = tokenService.setUserDataWithPassword(registerBody);

    const user = await User.create(userDataWithHashPassword);

    const responseUserData = createResponseUserData(user);

    await mailService.sendActivationMail(responseUserData.email, responseUserData.activationLink);

    const responseUserDataWithToken = tokenService.setUserDataWithToken(responseUserData);

    await tokenService.saveToken({
      userId: responseUserDataWithToken.id,
      refreshToken: responseUserDataWithToken.refreshToken,
    });

    return createResponse(201, 'Successfully!', responseUserDataWithToken);
  }
}

export default new AuthService();
