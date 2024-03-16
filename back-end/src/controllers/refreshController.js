import { pick } from 'lodash/fp';

import ApiError from '../exceptions/apiError';
import refreshService from '../services/refreshService';

export const refresh = async (req, res, next) => {
  try {
    console.log('req.body:', req.body);
    const { prevData, coinList } = pick(['prevData', 'coinList'], req.body);

    const user = await refreshService.refresh({
      userId: req.user.id,
      prevData,
      coinList,
    });

    if (!user) {
      return next(
        ApiError.BadRequest('Вы не были найдены в нашей базе данных')
      );
    }

    return res.status('200').json(user);
  } catch (e) {
    console.log('Ошибка 001:', e);
    next(ApiError.BadRequest('Непредвиденная ошибка 001'));
  }
};
