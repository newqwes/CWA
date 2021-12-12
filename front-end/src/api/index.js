import axios from 'axios';

import { getToken } from '../utils/localStore';

axios.interceptors.request.use(config => ({
  ...config,

  // NOTE: When deploying to the server, this REACT_APP_API_URL
  // variable is not needed. No need to change at release
  baseURL: `${process.env.REACT_APP_API_URL || ''}api/`,
  headers: { Authorization: getToken() },
}));

export const authAPI = {
  /**
   * @returns {object} email, id, login, accessToken, type
   */
  login: async ({ email, password }) => {
    try {
      const { data } = await axios.post('auth/login', { email, password });

      return data;
    } catch ({ response: { data } }) {
      return data;
    }
  },

  /**
   * @returns {object} email, id, login, accessToken, type
   */
  registration: async ({ email, password, login }) => {
    try {
      const { data } = await axios.post('auth/registration', { email, password, login });

      return data;
    } catch ({ response: { data } }) {
      return data;
    }
  },

  status: async () => {
    try {
      const { data } = await axios.get('auth/status');

      return data;
    } catch ({ response: { data } }) {
      return data;
    }
  },
};
