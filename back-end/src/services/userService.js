import User from '../database/models/user';
import createResponse from '../utils/createResponse';

class UserService {
  async findByKey(value, key) {
    const user = await User.findOne({ where: { [key]: value } });

    return user;
  }

  async findOrCreateByEmail(email, defaults) {
    try {
      const [user, created] = await User.findOrCreate({ where: { email }, defaults });

      return { user, created };
    } catch (error) {
      createResponse(500, 'Server Error findOrCreateByEmail', error);
    }
  }
}

export default new UserService();
