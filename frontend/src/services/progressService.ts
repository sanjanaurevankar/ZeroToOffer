import api from "./api";

export const getUserProgress = () => api.get("/progress");
export const getDashboardStats = () => api.get("/progress/stats");
export const toggleSolved = (questionId: string) => api.put(`/progress/${questionId}`);