import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/api",
});

export const getCategories = () => API.get("/categories/");

export const getLocationsByCategory = (categoryId) =>
  API.get(`/locations/category/${categoryId}`);

export const getLocationById = (id) =>
  API.get(`/locations/${id}`);

export const getCrowdScore = (id) =>
  API.get(`/crowd-score/${id}`);

export const getTraffic = (id) =>
  API.get(`/traffic/${id}`);

export const getWeather = (id) =>
  API.get(`/weather/${id}`);

export const getRecommendations = (id) =>
  API.get(`/recommendations/${id}`);

export const getCategoryById = (id) =>
  API.get(`/categories/${id}`);