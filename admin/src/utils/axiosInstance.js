/**
 * axios with a custom config.
 */

import axios from 'axios';
import { adminApi } from '@strapi/strapi/admin';

const instance = axios.create({
  baseURL: process.env.STRAPI_ADMIN_BACKEND_URL,
});

instance.interceptors.request.use(
  async (config) => {
    //replaced 'auth.getToken()' from @strapi/helper-plugin
    const item = localStorage.getItem('jwtToken') ?? sessionStorage.getItem('jwtToken');
    var jwt = item;
    try {
      jwt = JSON.parse(item);
    }
    catch {}

    config.headers = {
      Authorization: `Bearer ${jwt}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    // whatever you want to do with the error
    if (error.response?.status === 401) {

      // auth.clearAppStorage();
      // imported action within adminApi: https://redux-toolkit.js.org/rtk-query/api/created-api/api-slice-utils#resetapistate
      adminApi.util.resetApiState();

      window.location.reload();
    }

    throw error;
  }
);

// removed wrapper as all it did is warn of future deprecation of 'AxiosInstance' type when in development mode
// which is not relevant as this code uses the actual axios
// const wrapper = wrapAxiosInstance(instance);
const wrapper = instance;

export default wrapper;
