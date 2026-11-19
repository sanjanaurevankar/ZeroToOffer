import api from "./api";

export const registerUser = (userData: any) => api.post("/auth/register", userData);
export const loginUser = (userData: any) => api.post("/auth/login", userData);
export const getCurrentUser = () => api.get("/auth/me");