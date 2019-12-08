import axios from 'axios';

export const http = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  headers: { authorization: `Bearer ${localStorage.getItem('auth_token')}` },
});
export const auth = axios.create({ baseURL: process.env.VUE_APP_AS_URL });
