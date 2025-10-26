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

export const fetchAboutMe = async () => {
  const response = await api.get("/aboutme");
  return response.data;
};

export const createAboutMe = async (data) => {
  const response = await api.post("/aboutme", data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const updateAboutMe = async (id, data) => {
  const response = await api.put(`/aboutme/${id}`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const deleteAboutMe = async (id) => {
  const response = await api.delete(`/aboutme/${id}`);
  return response.data;
};

export const fetchSkills = async () => {
  const response = await api.get("/skills");
  return response.data;
};

export const createSkill = async (data) => {
  const response = await api.post("/skills", data);
  return response.data;
};

export const updateSkill = async (id, data) => {
  const response = await api.put(`/skills/${id}`, data);
  return response.data;
};

export const deleteSkill = async (id) => {
  const response = await api.delete(`/skills/${id}`);
  return response.data;
};

export default api;
