import ApiError from '../exceptions/apiError';
import { getGender, getUserId } from '../utils/user';
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
export const getUserList = async (req, res, next) => {
  try {
    const userId = getUserId(req);

    if (!userId) {
      return next(ApiError.BadRequest('Вы не были найдены в нашей базе данных'));
    }

    const { status, data } = await userService.getUserList(userId);

    res.status(status).json(data);
  } catch (e) {
    next(e);
  }
};

export const getAvailableAvatars = async (req, res, next) => {
  try {
    const gender = getGender(req);

    const { status, data } = await userService.getAvailableAvatars(gender);

    res.status(status).json(data);
  } catch (e) {
    next(e);
  }
};
