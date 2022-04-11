import axios from "axios";
import axiosInstance, { mainUrl } from "./axios";

export const loginRequest = async (requestData) =>
  axios.post(`${mainUrl}/api/token/`, requestData).then((response) => {
    localStorage.setItem("access_token", response.data.access);
    localStorage.setItem("refresh_token", response.data.refresh);
    axiosInstance.defaults.headers.Authorization = `JWT ${localStorage.getItem(
      "access_token"
    )}`;
    return response.data;
  });

export const userInfoRequest = async () =>
  axiosInstance.get("/accounts/user-info").then((response) => response.data);

export const logoutRequest = async () =>
  axiosInstance({
    method: "post",
    url: "/accounts/logout",
    data: { refresh_token: localStorage.getItem("refresh_token") },
  }).then((response) => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    return response.data;
  });
