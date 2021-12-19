import ApiError from '../exceptions/apiError';
import tokenService from '../services/tokenService';

const authMiddleware = (req, res, next) => {
  try {
    const authenticated = req.isAuthenticated();

    if (authenticated && req.user) {
      return next();
    }

    const accessToken = req.headers.authorization;

    if (!accessToken) {
      return next(ApiError.UnauthorizedError());
    }

    const userData = tokenService.validateAccessToken(accessToken);

    if (!userData) {
      return next(ApiError.UnauthorizedError());
    }

    req.user = userData;
    next();
  } catch (e) {
    return next(ApiError.UnauthorizedError());
  }
};

export default authMiddleware;
