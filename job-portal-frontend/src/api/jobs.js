import axios from "axios";

function getApiBaseUrl() {
  const fallbackUrl = "http://localhost:5000/api";
  const rawValue = import.meta.env.VITE_API_URL?.trim();

  if (!rawValue) {
    return fallbackUrl;
  }

  const normalizedValue = rawValue
    .replace(/^VITE_API_URL=/i, "")
    .replace(/^https:\//i, "https://")
    .replace(/^http:\//i, "http://")
    .replace(/\/+$/, "")
    .replace(/\/jobs$/i, "");

  return normalizedValue || fallbackUrl;
}

const API = axios.create({
  baseURL: getApiBaseUrl(),
});

export const getAllJobs = () => API.get("/jobs");
export const getJobById = (id) => API.get(`/jobs/${id}`);
export const createJob = (data) => API.post("/jobs", data);
export const updateJob = (id, data) => API.put(`/jobs/${id}`, data);
export const deleteJob = (id) => API.delete(`/jobs/${id}`);
