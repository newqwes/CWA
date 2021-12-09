import bcrypt from 'bcrypt';

import createResponse from '../utils/createResponse';
import { createUserData, createResponseUserData, getUserId } from '../utils/user';

import tokenService from './tokenService';
import userService from './userService';
import mailService from './mailService';
import User from '../database/models/user';

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
   * @param {Object} body - ready user data
   * @param {string} body.login
   * @param {string} body.password
   * @param {string} body.email
   * @returns {Object} all user data form database without password
   */
  async create(body) {
    const { email, password } = body;

    const foundUser = await userService.findByEmail(email);

    if (foundUser) {
      return createResponse(409, 'email already exists!');
    }

    const userData = createUserData(body);

    const userDataWithPassword = tokenService.setUserDataWithPassword(userData, password);

    const user = await User.create(userDataWithPassword);

    const responseUserData = createResponseUserData(user);

    await mailService.sendActivationMail(responseUserData.email, responseUserData.activationLink);

    const responseUserDataWithToken = tokenService.setUserDataWithToken(responseUserData);

    const tokenData = await tokenService.saveToken({
      id: responseUserDataWithToken.id,
      refreshToken: responseUserDataWithToken.refreshToken,
    });

    console.log('______________________________', tokenData);

    return createResponse(201, 'Successfully!', responseUserDataWithToken);
  }

  async status(req) {
    const userId = getUserId(req);

    if (userId) {
      return createResponse(200, 'Successfully!', true);
    }

    return createResponse(403, 'Incorrect token!', false);
  }
}

export default new AuthService();
