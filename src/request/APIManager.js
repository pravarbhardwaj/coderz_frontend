import axios from "axios";
import api from "./request";
import { Form } from "react-router-dom";

export const BASE_URL = "https://coding1.questplus.in/api/v1/";

const handleLogout = (navigation) => {
  console.log("Logout!");
  localStorage.clear();
  navigation("/login", { replace: true });
};

export const getAPI = async (navigation, url) => {
  try {
    const headers = {
      "Cache-Control": "no-cache",
      Accept: "application/json",
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": true,
    };

    console.log("URL - ", url);

    const response = await api.get(url, { headers: headers });
    if (response.status == 400) {
      return { error: response.data.error };
    }
    return response.data;
  } catch (err) {
    if (err?.status == 401) {
      handleLogout(navigation);
      return { status: "error" };
    }
    console.log("GET error - ", err);
  }
};

export const postAPI = async (navigation, url, payload, upload=false) => {
  try {
    const headers = {
      "Cache-Control": "no-cache",
      Accept: "application/json",
    };
    console.log("upload ?? - ", upload)
    headers["Content-Type"] = upload ? "multipart/form-data" : "application/json"

    const response = await api.post(url, payload, { headers: headers });
    if (response.status == 400) {
      return { error: response.data.error };
    }
    return response.data;
  } catch (err) {
    if (err?.status == 401) {
      handleLogout(navigation);
      return { status: "error" };
    }
    alert(err.response.data.error)
    console.log("Post error - ", err.response.data.error);

    return false
    // console.log("Post error - ", Object.keys(err));

  }
};

export const putAPI = async (navigation, url, payload) => {
  try {
    const headers = {
      "Cache-Control": "no-cache",
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    const response = await api.put(url, payload, { headers: headers });
    if (response.status == 400) {
      return { error: response.data.error };
    }
    return response.data;
  } catch (err) {
    if (err?.status == 401) {
      handleLogout(navigation);
      return { status: "error" };
    }
    console.log("Post error - ", err.data.error);
  }
};

export const patchAPI = async (navigation, url, payload, upload=false) => {
  try {
    const headers = {
      "Cache-Control": "no-cache",
      Accept: "application/json",
    };

    headers["Content-Type"] = upload ? "multipart/form-data" : "application/json"

    const response = await api.patch(url, payload, { headers: headers });
    if (response.status == 400) {
      return { error: response.data.error };
    }
    return response.data;
  } catch (err) {
    if (err?.status == 401) {
      handleLogout(navigation);
      return { status: "error" };
    }
    alert(err.response.data.error)
    console.log("Patch error - ", err.response.data.error);

    return false
    // console.log("Post error - ", Object.keys(err));

  }
};

export const loginApi = async (username, password, setUserRole) => {
  try {
    const requestUrl = BASE_URL + "accounts/login/";
    const payload = { UserName: username, password: password };
    console.log("Payload - ", payload);
    const response = await axios.post(requestUrl, payload);
    console.log("response = ", response);
    if (response.status != 200) {
      return false;
    }

    const data = response.data;
    localStorage.setItem("access", data.access);
    localStorage.setItem("refresh", data.refresh);
    localStorage.setItem("role", data.role);
    setUserRole(data.role);
    return true;
  } catch (e) {
    console.log(e);
    return false;
    // return e.data.message
  }
};
