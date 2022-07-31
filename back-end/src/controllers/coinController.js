import ApiError from '../exceptions/apiError';
import coinService from '../services/coinService';

export const getCoins = async (req, res, next) => {
  try {
    const dataCoins = await coinService.getCoins({ coins: req.body });

    if (!dataCoins) {
      return next(ApiError.BadRequest('Монеты не были найдены!'));
    }

    return res.status('200').json(dataCoins);
  } catch (e) {
    next(e);
  }
};
