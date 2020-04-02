/* eslint-disable no-param-reassign */
import axios from 'axios';
import router from './router';

const protectedHttp = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
});
const publicHttp = axios.create({ baseURL: process.env.VUE_APP_AS_URL });

protectedHttp.interceptors.request.use((config) => {
  config.headers = {
    authorization: `Bearer ${localStorage.getItem('auth_token')}`,
    'x-app-key': process.env.VUE_APP_KEY,
  };
  return config;
}, (error) => {
  if (error.response.status === 401) {
    localStorage.removeItem('auth_token');
    return router.push('/');
  }
  return Promise.reject(error);
});

protectedHttp.interceptors.response.use(response => response,
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('loggedInUser');
      return router.push('/');
    }
    return Promise.reject(error);
  });

export const http = protectedHttp;
export const auth = publicHttp;
