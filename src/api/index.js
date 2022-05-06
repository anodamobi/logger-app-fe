import axios from "axios";
import { config } from "../config/axios";
import { getAuthToken } from "../utils/token";

export const api = axios.create(config);

api.interceptors.request.use(function (config) {
  let token = getAuthToken();
  config.headers["Authorization"] = "Bearer " + token;
  return config;
});

api.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    if (error.response.status === 401) {
      localStorage.removeItem("token");
      window.location.reload();
    }

    return Promise.reject(error);
  }
);
