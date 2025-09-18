// Configuración base para backend Spring Boot
const API_BASE = "http://localhost:8080";

// Headers estándar para todas las requests
const defaultHeaders = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

const handleResponse = async (response) => {
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `HTTP ${response.status}: ${errorText || response.statusText}`
    );
  }

  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return await response.json();
  }

  return await response.text();
};

/* GET de todas las medicaciones - endpoint /medicamentos */
export const getAllDrugs = async () => {
  try {
    const response = await fetch(`${API_BASE}/medicamentos`, {
      method: "GET",
      headers: defaultHeaders,
    });

    return await handleResponse(response);
  } catch (error) {
    console.error('Error fetching drugs:', error);
    return getMockDrugs();
  }
};

/* GET medicamento por ID */
export const getDrugById = async (drugId) => {
  try {
    const response = await fetch(`${API_BASE}/medicamentos/${drugId}`, {
      method: "GET",
      headers: defaultHeaders,
    });

    return await handleResponse(response);
  } catch (error) {
    console.error('Error fetching drug by id:', error);
    throw error;
  }
};

/* Crear nueva medicación */
export const createDrug = async (drugRequest) => {
  try {
    const response = await fetch(`${API_BASE}/medicamentos`, {
      method: "POST",
      headers: defaultHeaders,
      body: JSON.stringify(drugRequest),
    });

    return await handleResponse(response);
  } catch (error) {
    console.error('Error creating drug:', error);
    throw error;
  }
};

/* Actualizar medicación */
export const updateDrug = async (drugId, drugRequest) => {
  try {
    const response = await fetch(`${API_BASE}/medicamentos/${drugId}`, {
      method: 'PUT',
      headers: defaultHeaders,
      body: JSON.stringify(drugRequest),
    });

    return await handleResponse(response);
  } catch (error) {
    console.error('Error updating drug:', error);
    throw error;
  }
};

/* Eliminar medicación */
export const deleteDrug = async (drugId) => {
  try {
    const response = await fetch(`${API_BASE}/medicamentos/${drugId}`, {
      method: 'DELETE',
      headers: defaultHeaders,
    });

    return await handleResponse(response);
  } catch (error) {
    console.error('Error deleting drug:', error);
    throw error;
  }
};

/* Marcar como tomada */
export const markAsTaken = async (drugId) => {
  try {
    const response = await fetch(`${API_BASE}/medicamentos/${drugId}/taken`, {
      method: 'PUT',
      headers: defaultHeaders,
    });

    return await handleResponse(response);
  } catch (error) {
    console.error('Error marking drug as taken:', error);
    throw error;
  }
};

// Mock data para desarrollo
const getMockDrugs = () => {
  return [
    {
      id: 1,
      name: "Ibuprofeno",
      dose: "500mg",
      scheduledTime: "08:00",
      status: "PENDING"
    }
  ];
};