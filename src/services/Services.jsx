import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8080",
  headers: { "Content-Type": "application/json" },
});

export const getAllDrugs = async () => {
  const { data } = await api.get("/medicaciones");
  return data;
};

export const createDrug = async (payload) => {
  const { data } = await api.post("/medicaciones", payload);
  return data;
};

export const updateDrug = async (id, payload) => {
  const { data } = await api.put(`/medicaciones/${id}`, payload);
  return data;
};

export const deleteDrug = async (id) => {
  await api.delete(`/medicaciones/${id}`);
};

export const markAsTaken = async (id) => {
  await api.post(`/medicaciones/${id}/taken`);
};
