import ApiError from '../exceptions/apiError';
import { getUserId } from '../utils/user';
import userService from '../services/userService';

export const deleteUser = async (req, res, next) => {
  try {
    const userId = getUserId(req);

    if (!userId) {
      return next(ApiError.BadRequest('Пользователь не найден'));
    }

    const { status, data } = await userService.deleteUser(userId);

    res.status(status).json(data);
  } catch (e) {
    next(e);
  }
};
