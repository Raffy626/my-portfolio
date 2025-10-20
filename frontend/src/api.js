import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const IMAGE_BASE = import.meta.env.VITE_IMAGE_BASE || API_BASE.replace(/\/api$/, "");

const api = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export { API_BASE as API_BASE_URL, IMAGE_BASE };

export default api;