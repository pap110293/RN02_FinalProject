import axios from 'axios';
import api from './api';

export const login = (data) => {
  return api.post('auth/login', data);
};

export const register = (data) => {
  return api.post('auth/register', data);
};

export const userSignUp = (data) => {
  return axios({
    url: 'http://svcy3.myclass.vn/api/Users/signup',
    method: 'POST',
    data,
  });
};

export const userLogin = (data) =>
  axios({
    url: 'http://svcy3.myclass.vn/api/Users/signin',
    method: 'POST',
    data,
  });
