import axios from 'axios';
import { BASE_URL } from './APIManager';

  const api = axios.create({
    baseURL: BASE_URL,
  });
  
  // Add a request interceptor
  api.interceptors.request.use(
    async config => {
      const token = localStorage.getItem('access');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    error => Promise.reject(error),
  );
  
  api.interceptors.response.use(
    response => response,
    async error => {
      const originalRequest = error.config;
  
      // If the error status is 401 and there is no originalRequest._retry flag,
      // it means the token has expired and we need to refresh it
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
  
        try {
          const refreshToken = localStorage.getItem('refresh');
          const response = await axios.post(`${BASE_URL}/refreshToken`, {
            refresh: refreshToken,
          });
          const token = response.data.access;
  
          localStorage.setItem('access', token);
          localStorage.setItem('refres', response.data.refresh);
          // Retry the original request with the new token
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return axios(originalRequest);
        } catch (error) {
          // Handle refresh token error or redirect to login
        }
      }
  
      return Promise.reject(error);
    },
  );

  export default api

 

