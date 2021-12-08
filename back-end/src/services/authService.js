import bcrypt from 'bcryptjs';

import createResponse from '../utils/createResponse';
import {
  setUserDataWithToken,
  setUserDataWithPassword,
  createUserData,
  createResponseUserData,
  getUserId,
} from '../utils/user';

import userService from './userService';
import User from '../database/models/user';

class AuthService {
  async login({ email, password }) {
    try {
      const foundUser = await userService.findByEmail(email);

      if (!foundUser) {
        return createResponse(401, 'Incorrect email or password!');
      }

      const { password: userPassword } = foundUser;

      const isPasswordEqual = bcrypt.compareSync(password, userPassword);

      if (isPasswordEqual) {
        const responseUserData = createResponseUserData(foundUser);
        const responseUserDataWithToken = setUserDataWithToken(responseUserData);

        return createResponse(200, 'Successfully!', responseUserDataWithToken);
      }

      return createResponse(401, 'Incorrect email or password!');
    } catch (error) {
      return createResponse(500, 'Server Error', error);
    }
  }

  async create(body) {
    try {
      const { email, password } = body;

      const foundUser = await userService.findByEmail(email);

      if (foundUser) {
        return createResponse(409, 'email already exists!');
      }

      const userData = createUserData(body);

      const userDataWithPassword = setUserDataWithPassword(userData, password);

      const user = await User.create(userDataWithPassword);

      const responseUserData = createResponseUserData(user);
      const responseUserDataWithToken = setUserDataWithToken(responseUserData);

      return createResponse(201, 'Successfully!', responseUserDataWithToken);
    } catch (error) {
      return createResponse(500, 'Server Error', error);
    }
  }

  async status(req) {
    try {
      const userId = getUserId(req);

      if (userId) {
        return createResponse(200, 'Successfully!', true);
      }

      return createResponse(403, 'Incorrect token!', false);
    } catch (error) {
      return createResponse(500, 'Server Error', error);
    }
  }
}

export default new AuthService();
