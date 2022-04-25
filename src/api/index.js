import axios from "axios";
import { config } from "../config/axios";

export const api = axios.create(config);

api.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);
