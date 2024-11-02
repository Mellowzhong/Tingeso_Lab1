import axios from "axios";

const api = axios.create({
  baseURL: `http://191.232.176.167:8090`,
});

export default api;
