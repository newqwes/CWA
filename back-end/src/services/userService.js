import User from '../database/models/user';

class UserService {
  async findByEmail(email) {
    const foundUser = await User.findOne({ where: { email } });

    if (foundUser) return foundUser.toJSON();
  }
}

export default new UserService();
