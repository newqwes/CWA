import ApiError from '../exceptions/apiError';

// eslint-disable-next-line no-unused-vars
const errorMiddleware = (err, req, res, _next) => {
  if (err instanceof ApiError) {
    return res.status(err.status).json({ message: err.message, errors: err.errors });
  }

  return res.status(500).json({ message: 'Непредвиденная ошибка' });
};

export default errorMiddleware;
