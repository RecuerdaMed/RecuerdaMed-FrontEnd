import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8080",
  headers: { "Content-Type": "application/json" },
});

const API_PATH = "/medicamentos";

export const getAllDrugs = async () => {
  const { data } = await api.get(API_PATH);
  return data;
};

export const createDrug = async (payload) => {
  const { data } = await api.post(API_PATH, payload);
  return data;
};

export const markAsTaken = async (id) => {
  await api.put(`${API_PATH}/${id}/tomado`);
};

export const deleteDrug = async (id) => {
  await api.delete(`${API_PATH}/${id}`);
};
