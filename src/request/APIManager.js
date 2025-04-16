import axios from "axios";
import api from "./request";
import { Form } from "react-router-dom";

export const BASE_URL = "https://coding1.questplus.in/api/v1/";

const handleLogout = (navigation) => {
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

export const postAPI = async (navigation, url, payload, upload = false) => {
  try {
    const headers = {
      "Cache-Control": "no-cache",
      Accept: "application/json",
    };
    headers["Content-Type"] = upload
      ? "multipart/form-data"
      : "application/json";

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
    alert(err.response.data.error);
    console.log("Post error - ", err.response.data.error);

    return false;
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

export const patchAPI = async (navigation, url, payload, upload = false) => {
  try {
    const headers = {
      "Cache-Control": "no-cache",
      Accept: "application/json",
    };

    headers["Content-Type"] = upload
      ? "multipart/form-data"
      : "application/json";

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
    alert(err.response.data.error);
    console.log("Patch error - ", err.response.data.error);

    return false;
  }
};

export const loginApi = async (username, password, setUserRole) => {
  try {
    const requestUrl = BASE_URL + "accounts/login/";
    const payload = { UserName: username, password: password };
    const response = await axios.post(requestUrl, payload);
    if (response.status != 202) {
      return false;
    }

    const data = response.data.payload;
    localStorage.setItem("access", data.token.access);
    localStorage.setItem("refresh", data.token.refresh);
    localStorage.setItem("role", data.user_type);
    localStorage.setItem("user_id", data.cid);
    localStorage.setItem("username", data.username);
    localStorage.setItem("name", data.name);

    setUserRole(data.user_type);
   
    return true;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      console.log("Axios error:", e.response?.status);
      console.log("Response data:", e.response?.data);
    } else {
      console.log("Non-Axios error:", e);
    }
    return false;
  }
};

export const redirectLogin = async (creds, setUserRole) => {
  try {
    const requestUrl = BASE_URL + "accounts/student-login/";
    const payload = { username: creds, questRedirect: true };
    const response = await axios.post(requestUrl, payload);
    if (response.status != 202) {
      return false;
    }

    const data = response.data.payload;
    localStorage.setItem("access", data.token.access);
    localStorage.setItem("refresh", data.token.refresh);
    localStorage.setItem("role", data.user_type);
    localStorage.setItem("user_id", data.cid);
    localStorage.setItem("username", data.username);
    setUserRole(data.user_type);
    return true;
  } catch (e) {
    console.log(e);
    return false;
    // return e.data.message
  }
};

export const getCurrentUserDetails = async () => {
  try {
    const response = await axios.get(
      "https://apiv2.questplus.in/api/users/getCurrenUserDetails",

      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status != 200) {
      return false;
    }
    const data = response.data;
    localStorage.setItem(
      "questId",
      data.lastQuestAccessed ?? data.userQuest[0]["questId"]
    );
    return true;
  } catch (error) {
    console.error("Error fetching user details:", error);
  }
};
