import axios from "axios";
import { storageKey } from "../constants/storage";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to request if exists
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(storageKey.TOKEN);
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
api.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error.response);
  }
);

export default api;
