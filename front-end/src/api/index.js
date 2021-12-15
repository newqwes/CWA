import axios from 'axios';

import { getToken } from '../utils/localStore';

// NOTE: When deploying to the server, this REACT_APP_API_URL
// variable is not needed. No need to change at release
const baseURL = `${process.env.REACT_APP_API_URL || ''}api/`;

axios.interceptors.request.use(config => ({
  ...config,
  baseURL,
  withCredentials: true,
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

  googleAuth: async () => {
    try {
      let timer = null;

      const googleLoginURL = process.env.REACT_APP_API_URL
        ? `${baseURL}auth/google`
        : 'https://www.coinlitics.ru/api/auth/google';

      const newWindow = window.open(googleLoginURL, '_blank', 'width=500,height=600');

      if (newWindow) {
        timer = setInterval(() => {
          if (newWindow.closed) {
            console.log('Окно гугл закрыто!)');
            // Здесь колбэк

            if (timer) {
              clearInterval(timer);
            }
          }
        }, 500);
      }
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

  logout: async () => {
    try {
      await axios.get('auth/logout');
    } catch ({ response: { data } }) {
      return data;
    }
  },
};
