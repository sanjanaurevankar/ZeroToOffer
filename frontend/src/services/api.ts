import axios from "axios";
import { API_BASE_URL, TOKEN_KEY } from "../utils/constants";

const api = axios.create({ baseURL: API_BASE_URL });

api.interceptors.request.use((req) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem(TOKEN_KEY);
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;