import axios from 'axios';

const BASE_URL = "https://shubham.lobstersearch.com/api/v1/"
const axiosConfig = axios.create({
  baseURL: BASE_URL, //replace with your BaseURL
  headers: {
    'Content-Type': 'application/json', // change according header type accordingly
  },
});

export default axiosConfig;

axiosConfig.interceptors.request.use(
    (config) => {
      const accessToken = localStorage.getItem('accessToken'); // get stored access token
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`; // set in header
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axiosConfig.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
          try {
            const response = await axios.post(`${BASE_URL}/refreshToken`, {refreshToken});
            // don't use axious instance that already configured for refresh token api call
            const newAccessToken = response.data.accessToken;
            localStorage.setItem('accessToken', newAccessToken);  //set new access token
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return axios(originalRequest); //recall Api with new token
          } catch (error) {
            // Handle token refresh failure
            // mostly logout the user and re-authenticate by login again
          }
        }
      }
      return Promise.reject(error);
    }
  );


  export const loginApi = async (username, password, setUserRole) => {
    try {
    const requestUrl = BASE_URL + "accounts/login/"
    const payload = {"UserName": username, "password": password}
    console.log("Payload - ", payload)
    const response = await axios.post(requestUrl, payload
      )
      console.log("response = ", response)
      if (response.status != 200) {
        return false
      }
       
      const data = response.data
      localStorage.setItem('access', data.access) 
      localStorage.setItem('refresh', data.refresh)
      localStorage.setItem('role', data.role)
      setUserRole(data.role)
      return true

    }
    catch(e) {
      console.log(e)
      return false
      // return e.data.message
    }
  }