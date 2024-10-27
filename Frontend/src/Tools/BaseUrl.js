import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_APU_URL,
});

export default api;
