import ApiError from '../exceptions/apiError';
import tokenService from '../services/tokenService';

const authMiddleware = (req, res, next) => {
  try {
    const googleauthorization = req.isAuthenticated();

    if (googleauthorization && req.user) {
      return next();
    }

    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return next(ApiError.UnauthorizedError());
    }

    const accessToken = authorizationHeader.split(' ')[1];
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
