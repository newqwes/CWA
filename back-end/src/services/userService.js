import User from '../database/models/user';

class UserService {
  async findByKey(value, key) {
    return User.findOne({ where: { [key]: value } });
  }
}

export default new UserService();
