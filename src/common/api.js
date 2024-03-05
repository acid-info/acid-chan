import axios, { AxiosError } from 'axios';

export const API_BASE = 'https://api.chec.io/v1';

const api = axios.create({
  baseURL: API_BASE,
});

api.interceptors.request.use(
  async (config) => {
    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response?.status === 401) {
      try {
        console.log('error.response', error.response);
      } catch (e) {
        console.log('error', e);
      }
    }
    return Promise.reject(error);
  },
);

export { api };
