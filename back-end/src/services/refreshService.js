import UserDto from '../dto/userDto';
import ApiError from '../exceptions/apiError';
import userService from './userService';

class RefreshService {
  async refresh(id) {
    const user = await userService.findByKey(id, 'id');

    if (!user) {
      throw ApiError.BadRequest('Пользователь с таким ID не существует');
    }

    user.score += 1;
    user.lastDateUpdate = Date.now();
    await user.save();

    const userDto = new UserDto(user);
    const userData = { ...userDto };

    return userData;
  }
}

export default new RefreshService();
