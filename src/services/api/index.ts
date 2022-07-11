import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_DEV_URL
});

export default api;
