import ApiError from '../exceptions/apiError';
import refreshService from '../services/refreshService';

// NOTE: IMPORTANT dont use async
export const refresh = async (req, res, next) => {
  try {
    const user = await refreshService.refresh(req.user.id, req.body.prevData);

    if (!user) {
      return next(ApiError.BadRequest('Вы не были найдены в нашей базе данных'));
    }

    return res.status('200').json(user);
  } catch (e) {
    next(e);
  }
};
