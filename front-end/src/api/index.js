import axios from 'axios';

import { extractResponsData } from '../utils/preparationData';
import { getToken } from '../utils/localStore';

axios.interceptors.request.use(config => ({
  ...config,
  baseURL: 'http://localhost:3005/api/',
  headers: { Authorization: getToken() },
}));

export const authAPI = {
  login: async body => {
    try {
      const respons = await axios.post('auth/login', body);

      return extractResponsData(respons);
    } catch (error) {
      return error;
    }
  },

  registration: async body => {
    try {
      const respons = await axios.post('auth/register', body);

      return extractResponsData(respons);
    } catch (error) {
      return error;
    }
  },
};
