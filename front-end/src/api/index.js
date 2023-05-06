import axios from 'axios';

import { getToken } from '../utils/localStore';

// NOTE: When deploying to the server, this REACT_APP_API_URL
// variable is not needed. No need to change at release
export const baseURL = `${process.env.REACT_APP_API_URL || ''}api/`;

export const googleLoginURL = process.env.REACT_APP_API_URL
  ? `${baseURL}auth/google`
  : '/api/auth/google';

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

export const refreshAPI = {
  refresh: async ({ prevData, coinList }) => {
    try {
      const { data } = await axios.post('refresh', { prevData, coinList });

      return data;
    } catch ({ response: { data } }) {
      return data;
    }
  },
};

export const userAPI = {
  deleteUser: async () => {
    try {
      const { data } = await axios.delete('user/delete');

      return data;
    } catch ({ response: { data } }) {
      return data;
    }
  },
  getUserList: async () => {
    try {
      const { data } = await axios.get('user');

      return data;
    } catch ({ response: { data } }) {
      return data;
    }
  },
  getAvatarList: async (gender) => {
    try {
      const { data } = await axios.get('avatar', { params: { gender } });

      return data;
    } catch ({ response: { data } }) {
      return data;
    }
  },
};

export const orderAPI = {
  setUserOrder: async ({ count, coinId, price, date }) => {
    try {
      const { data } = await axios.post('order', { count, coinId, price, date });

      return data;
    } catch ({ response: { data } }) {
      return data;
    }
  },

  getUserOrders: async () => {
    try {
      const { data } = await axios.get('order');

      return data;
    } catch ({ response: { data } }) {
      return data;
    }
  },

  deleteUserOrder: async id => {
    try {
      const { data } = await axios.delete(`order/delete/${id}`);

      return data;
    } catch ({ response: { data } }) {
      return data;
    }
  },

  setUserOrders: async orders => {
    try {
      await axios.post('order/upload', orders);
    } catch ({ response: { data } }) {
      return data;
    }
  },
};

export const coingeckoAPI = {
  searchCoin: async coinname => {
    try {
      return fetch(`https://api.coingecko.com/api/v3/search?query=${coinname}`)
        .then(response => response.json())
        .then(body =>
          body.coins.map(coin => ({
            ...coin,
            label: coin.name,
            value: coin.id,
            smallImg: coin.thumb,
            largeImg: coin.large,
          })),
        );
    } catch ({ response: { data } }) {
      return data;
    }
  },
  getCoinData: async coins => {
    try {
      const { data } = await axios.post('coin', coins);

      return data;
    } catch ({ response: { data } }) {
      return data;
    }
  },
};
