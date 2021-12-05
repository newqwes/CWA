import {
  getUserId,
  setUserDataWithToken,
  setUserDataWithPassword,
  createUserData,
  createResponseUserData,
} from '../utils/user';
import createResponse from '../utils/createResponse';

import User from '../database/models/user';

class UserService {
  async findByEmail(email) {
    const foundUser = await User.findOne({ where: { email } });

    if (foundUser) return foundUser.toJSON();
  }

  async getInfo(req) {
    try {
      const id = getUserId(req);

      const user = await User.findOne({
        where: { id },
      });

      const responseUserData = createResponseUserData(user);
      const responseUserDataWithToken = setUserDataWithToken(responseUserData);

      return createResponse(200, 'Successfully!', responseUserDataWithToken);
    } catch (error) {
      return createResponse(500, 'Server Error', error);
    }
  }

  async update(req) {
    try {
      const { body } = req;

      const id = getUserId(req);

      let userData = createUserData(body);

      const { email } = userData;

      if (email) {
        const foundUser = await this.findByEmail(email);

        if (foundUser && foundUser.id !== id) {
          return createResponse(409, 'email already exists!');
        }
      }

      const { password } = body;

      if (password) {
        userData = setUserDataWithPassword(userData, password);
      }

      const user = await User.update(userData, {
        where: { id },
        returning: true,
        plain: true,
      });

      const responseUserData = createResponseUserData(user);
      const responseUserDataWithToken = setUserDataWithToken(responseUserData);

      return createResponse(200, 'Successfully!', responseUserDataWithToken);
    } catch (error) {
      return createResponse(500, 'Server Error', error);
    }
  }

  async delete(req) {
    try {
      const id = getUserId(req);

      await User.destroy({ where: { id } });

      return createResponse(200, 'Successfully!', id);
    } catch (error) {
      return createResponse(500, 'Server Error', error);
    }
  }
}

export default new UserService();
