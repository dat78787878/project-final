import axios from 'axios';
import { clearStorage, getToken } from './utils/auth';
import { baseUrl } from './utils/getbaseUrl';

const axiosConn = axios.create();

axiosConn.defaults.baseURL = baseUrl;

axiosConn.interceptors.request.use(function (config) {
  const token = getToken();
  if (token) {
    const commonHeaders = { ...JSON.parse(token) };
    config.headers = commonHeaders;
  }
  return config;
});

axiosConn.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const token = getToken();
    if (
      (token && error.response.status === 401) ||
      (error.response.status === 401 &&
        !['/login'].includes(window.location.pathname))
    ) {
      clearStorage();
      window.location.href = '/login';
      return;
    }
    // if (token && error.response.status === 404) {
    //   window.location.href = '/not_match';
    // }
    if (token && error.response.status === 400) {
      clearStorage();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosConn;
