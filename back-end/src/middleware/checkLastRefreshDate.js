import { pick } from 'lodash/fp';
import ApiError from '../exceptions/apiError';
import { isTimeLimitOver } from '../utils/toMinute';

const checkLastRefreshDate = (req, res, next) => {
  try {
    console.log('5 checkLastRefreshDate');
    const { dataRefreshLimitPerMinute, lastDateUpdate } = pick(
      ['dataRefreshLimitPerMinute', 'lastDateUpdate'],
      req.user,
    );

    const timeLimitOver = isTimeLimitOver(dataRefreshLimitPerMinute, lastDateUpdate);

    if (!timeLimitOver) {
      return res.status(405).json({ message: 'Еще время не настало!' });
    }

    next();
  } catch (e) {
    return next(ApiError.BadRequest('Ошибка при валидации'));
  }
};

export default checkLastRefreshDate;
