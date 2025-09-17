// Configuración base para luego el backend con Spring Boot
const API_BASE = "http://localhost:8080/api";

// Headers estándar par todas las requests
const defaultHeaders = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

// Función helper para manejar errores de forma consistente
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
GET DE TODAS LAS MEDICACIONES: GET/api/drugs */
export const getDrugs = async () => {
  try {
    const response = await fetch(`${API_BASE}/drugs`, {
      headers: defaultHeaders,
    });

    return await handleResponse(response);
  } catch (error) {
    console.error('Error fetching drugs; ', error);

    // Pruebo devolviendo datos mock mientras el backend no esté listo
    return getMockDrugs();
  }
};

/* Crear nueva medicación
Endpoint esperado: POST /api/drugs*/
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
Endpoint esperado: PUT /api/drugs/{id}/taken */
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
/* Para ver que funciona // ============================================
// MOCK DATA - Para desarrollo sin backend
// ============================================
 * Datos mock para desarrollo paralelo
 * Estructura que esperamos del backend Spring Boot
 */
const getMockDrugs = () => {
  const now = new Date();
  const today = now.toISOString().split('T')[0]; // YYYY-MM-DD format
  
  return [
    {
      id: 1,
      name: "Ibuprofeno",
      dose: "500mg",
      scheduledTime: "08:00",
      duration: "7 días",
      status: "PENDING",
      scheduledDate: today,
      takenAt: null,
      createdAt: "2024-09-17T07:00:00Z",
      updatedAt: "2024-09-17T07:00:00Z"
    },
    {
      id: 2,
      name: "Omeprazol",
      dose: "20mg",
      scheduledTime: "09:00",
      duration: "3 meses",
      status: "TAKEN",
      scheduledDate: today,
      takenAt: "2024-09-17T09:15:00Z",
      createdAt: "2024-09-17T07:00:00Z",
      updatedAt: "2024-09-17T09:15:00Z"
    },
    {
      id: 3,
      name: "Paracetamol",
      dose: "1g",
      scheduledTime: "14:30",
      duration: "5 días",
      status: "OVERDUE",
      scheduledDate: today,
      takenAt: null,
      createdAt: "2024-09-17T07:00:00Z",
      updatedAt: "2024-09-17T14:30:00Z"
    },
    {
      id: 4,
      name: "Vitamina D",
      dose: "1000 UI",
      scheduledTime: "20:00",
      duration: "6 meses",
      status: "PENDING",
      scheduledDate: today,
      takenAt: null,
      createdAt: "2024-09-17T07:00:00Z",
      updatedAt: "2024-09-17T07:00:00Z"
    }
  ];
};