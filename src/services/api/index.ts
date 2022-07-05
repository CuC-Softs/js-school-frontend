import axios from "axios";

const api = axios.create({
  baseURL: process.env.VITE_DEV_URL,
});

export default api;
