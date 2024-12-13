import axios from 'axios';
import handleError from './errorHandler';
const axiosInstance = axios.create({
  baseURL: 'https://api.weatherapi.com/v1',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  params: {
    key: process.env.REACT_APP_API_KEY
  }
});

// this is for future features to add actions for our req and res
axiosInstance.interceptors.request.use(
  config => {
    // Do something before request is sent
    return config;
  },
  error => handleError(error)
);

axiosInstance.interceptors.response.use(
  response => {
    // Do something with response data
    return response;
  },
  error => handleError(error)
);

export default axiosInstance;
