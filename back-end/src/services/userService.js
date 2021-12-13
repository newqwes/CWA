import User from '../database/models/user';

class UserService {
  async findByKey(value, key) {
    return User.findOne({ where: { [key]: value } });
  }

  async findOrCreateByEmail(email, defaults) {
    const [user, created] = await User.findOrCreate({ where: { email }, defaults });

    return { user, created };
  }
}

export default new UserService();
