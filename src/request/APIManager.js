import axios from "axios";
import api from "./request";

export const BASE_URL = "https://viable-reasonably-goldfish.ngrok-free.app/api/v1/"

const handleLogout = (navigation) => {
    console.log("Logout!")
    localStorage.clear()
    navigation('/login', { replace: true})
}

export const getAPI = async (
    navigation, 
    url
  ) => {
    try {
      const headers = {
        'Cache-Control': 'no-cache',
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': true,
      };
  
      const response = await api.get(url, {headers: headers});
      if (response.status == 400) {
        return {error: response.data.error};
      }
      return response.data;
    } catch (err) {
      if (err?.status == 401) {
        handleLogout(navigation);
        return {status: 'error'};
      }
      console.log('GET error - ', err.data.error);
    }
  };


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