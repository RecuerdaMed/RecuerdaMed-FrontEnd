import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api",
  headers: { "Content-Type": "application/json" },
});

const toTime = (hhmm) => (hhmm && hhmm.length === 5 ? `${hhmm}:00` : hhmm || "");
const toDate = (yyyy_mm_dd) => (yyyy_mm_dd ? yyyy_mm_dd : null);

export const formatDrugPayload = (d) => ({
  drugName: d.drugName,
  description: d.description ?? "",
  dosage: d.dosage,
  frequencyHours: typeof d.frequencyHours === "string" ? parseInt(d.frequencyHours, 10) : d.frequencyHours,
  nextIntakeTime: toTime(d.nextIntakeTime),
  startDate: toDate(d.startDate),
  endDate: toDate(d.endDate),
  active: d.active ?? true,
  activeReminder: d.activeReminder ?? true,
});

export const getAllDrugs = async () => {
  const { data } = await api.get("/drugs");
  return data;
};

export const getDrugById = async (id) => {
  const { data } = await api.get(`/drugs/${id}`);
  return data;
};

export const searchDrugsByName = async (drugName) => {
  const { data } = await api.get(`/drugs/search`, { params: { drugName } });
  return data;
};

export const createDrug = async (drug) => {
  const payload = formatDrugPayload(drug);
  const { data } = await api.post("/drugs", payload);
  return data;
};

export const updateDrug = async (id, drug) => {
  const payload = formatDrugPayload(drug);
  const { data } = await api.put(`/drugs/${id}`, payload);
  return data;
};

export const deleteDrug = async (id) => {
  await api.delete(`/drugs/${id}`);
};

export const markAsTaken = async (id) => {
  await api.post(`/drugs/${id}/taken`);
};

export const processReminders = async () => {
  await api.post(`/drugs/process-reminders`);
};
