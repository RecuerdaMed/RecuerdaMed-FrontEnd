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

export const updateDrug = async (id, payload) => {
  const { data } = await api.put(`${API_PATH}/${id}`, payload);
  return data;
};

// export const markAsTaken = async (id) => {
//   await api.put(`${API_PATH}/${id}/tomado`);
// };
// SOLUCIÓN: Usar PATCH en lugar de PUT customizado
export const markAsTaken = async (id) => {
  try {
    console.log('Marcando como tomado:', id);
    const { data } = await api.patch(`${API_PATH}/${id}`, { taken: true });
    console.log('Éxito al marcar como tomado');
    return data;
  } catch (error) {
    console.error('Error marking as taken:', error);
    throw error;
  }
};

// Función adicional para desmarcar (opcional)
export const markAsNotTaken = async (id) => {
  try {
    console.log('Marcando como NO tomado:', id);
    const { data } = await api.patch(`${API_PATH}/${id}`, { taken: false });
    console.log('Éxito al marcar como NO tomado');
    return data;
  } catch (error) {
    console.error('Error marking as not taken:', error);
    throw error;
  }
};

export const deleteDrug = async (id) => {
  await api.delete(`${API_PATH}/${id}`);
};
