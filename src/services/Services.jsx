// Configuración base para luego el backend con Spring Boot
const API_BASE = "http://localhost:5173/";

// Headers estándar par todas las requests
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

/* Funciones principales para la API de medicaciones de May y Julia
GET DE TODAS LAS MEDICACIONES: GET/drugs */
export const getDrugs = async () => {
  try {
    const response = await fetch(`${API_BASE}/drugs`, {
      headers: defaultHeaders,
    });

    return await handleResponse(response);
  } catch (error) {
    console.error('Error fetching drugs; ', error);

  
  }
};

/* Crear nueva medicación
Endpoint esperado: POST /drugs*/
export const createDrug = async (drugData) => {
  try {
    const response = await fetch(`${API_BASE}/drugs`, {
      method: "POST",
      headers: defaultHeaders,
      body: JSON.stringify(drugData),
    });

    return await handleResponse(response);
  } catch (error) {
    console.error('Error creating drug:', error);
    throw error; //esto es un re-throw para que el componente pueda manejar el error
  } 
};

/* Marcar medicación como tomada
Endpoint esperado: PUT /drugs/{id}/taken */
export const markDrugAsTaken = async (drugId) => {
  try {
    const response = await fetch(`${API_BASE}/drugs/${drugId}/taken`, {
      method: 'PUT',
      headers: defaultHeaders,
    });
    
    return await handleResponse(response);
  } catch (error) {
    console.error('Error marking drug as taken:', error);
    throw error;
  }
};
/* Eliminar medicación
Endpoint esperado: DELETE /api/drugs/{id} */
export const deletedrug = async (drugId) => {
  try {
    const response = await fetch(`${API_BASE}/drugs/${drugId}`, {
      method: 'DELETE',
      headers: defaultHeaders,
    });
    
    return await handleResponse(response);
  } catch (error) {
    console.error('Error deleting drug:', error);
    throw error;
  }
};
/* Actualizar medicación existente
Endpoint esperado: PUT /api/drugs/{id} */
export const updatedrug = async (drugId, drugData) => {
  try {
    const response = await fetch(`${API_BASE}/drugs/${drugId}`, {
      method: 'PUT',
      headers: defaultHeaders,
      body: JSON.stringify(drugData),
    });
    
    return await handleResponse(response);
  } catch (error) {
    console.error('Error updating drug:', error);
    throw error;
  }
};