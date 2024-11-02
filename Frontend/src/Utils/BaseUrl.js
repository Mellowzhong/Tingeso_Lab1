import axios from "axios";

const api = axios.create({
  baseURL: `http://${import.meta.env.VITE_BACKEND_SERVER_PRODUCTION}:8090`,
});

export default api;
