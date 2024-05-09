import Axios, { AxiosError } from "axios";
import { storage } from "./Storage";

export const axios = Axios.create({
  baseURL: "http://localhost:3000/api",
});

axios.interceptors.request.use((config) => {
  const token = storage.getToken();
  if (token) {
    config.headers.authorization = `Bearer ${token}`;
  }
  return config;
});

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);
