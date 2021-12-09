import authService from '../services/authService';

export const login = async (req, res) => {
  try {
    const result = await authService.login(req.body);

    return res.status(result.status).json(result);
  } catch (error) {
    return error;
  }
};

export const register = async (req, res) => {
  try {
    const result = await authService.create(req.body);

    res.cookie('refreshToken', result.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      // secure: true // if have https
    });

    return res.status(result.status).json(result);
  } catch (error) {
    return error;
  }
};

export const getStatus = async (req, res) => {
  try {
    const result = await authService.status(req);

    return res.status(result.status).json(result);
  } catch (error) {
    return error;
  }
};
