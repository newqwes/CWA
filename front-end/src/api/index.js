import axios from 'axios';

import { extractResponsData } from '../utils/preparationData';
import { getToken } from '../utils/localStore';

axios.interceptors.request.use(config => ({
  ...config,
  baseURL: 'http://localhost:3008/api/',
  headers: { Authorization: getToken() },
}));

export const authAPI = {
  /**
   * @returns {object} email, id, login, token, type
   */
  login: async ({ email, password }) => {
    try {
      const respons = await axios.post('auth/login', { email, password });

      return extractResponsData(respons);
    } catch ({ response: { data } }) {
      return data;
    }
  },

  /**
   * @returns {object} email, id, login, token, type
   */
  registration: async ({ email, password, login }) => {
    try {
      const respons = await axios.post('auth/register', { email, password, login });

      return extractResponsData(respons);
    } catch ({ response: { data } }) {
      return data;
    }
  },

  status: async () => {
    try {
      const respons = await axios.get('auth/status');

      return extractResponsData(respons);
    } catch ({ response: { data } }) {
      return data;
    }
  },
};
