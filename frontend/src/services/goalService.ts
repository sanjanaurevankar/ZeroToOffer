import api from "./api";

export const getGoals = () => api.get("/goals");
export const createGoal = (goalData: any) => api.post("/goals", goalData);
export const updateGoal = (id: string) => api.put(`/goals/${id}`);
export const deleteGoal = (id: string) => api.delete(`/goals/${id}`);