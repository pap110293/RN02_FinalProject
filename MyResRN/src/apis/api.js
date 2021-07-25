import axios from 'axios';
import config from 'react-native-config';

const api = axios.create({
  baseURL: config.API_URL,
});

// Add a request interceptor
api.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    console.log(error);
    return Promise.reject(error);
  }
);

// Add a response interceptor
api.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    debugger;
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    throw error.response;
  }
);

export default api;
