import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api/categories";


// GET ALL

export const getCategories = async () => {
  return await axios.get(`${BASE_URL}/`);
};


// GET BY ID

export const getCategoryById = async (id) => {
  return await axios.get(`${BASE_URL}/${id}`);
};


// CREATE CATEGORY

export const createCategory = async (data) => {
  return await axios.post(`${BASE_URL}/`, data);
};


// UPDATE CATEGORY

export const updateCategoryApi = async (id, data) => {
  return await axios.put(
    `${BASE_URL}/${id}`,
    data
  );
};


// DELETE / INACTIVE

export const deactivateCategoryApi = async (id) => {
  return await axios.patch(
    `${BASE_URL}/${id}/deactivate`
  );
};