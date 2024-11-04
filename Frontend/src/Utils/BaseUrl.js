import axios from "axios";

// Verifica las variables de entorno cargadas por Vite
console.log("Variables de entorno:", import.meta.env);

// Obtiene la URL base de la API desde las variables de entorno de Vite
const baseURL = import.meta.env.VITE_API_URL;

if (!baseURL) {
  console.error("La variable de entorno VITE_API_URL no está definida");
} else {
  console.log("Base URL:", baseURL); // Muestra la URL base para verificar si se está cargando correctamente
}

// Configura Axios con la baseURL
const api = axios.create({
  baseURL: baseURL || "http://localhost:3000", // Usa una URL por defecto si no se define
});

export default api;
