import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/api",
});

export const getLocations = () => API.get("/locations/");
export const getCategories = () => API.get("/categories/");

export const createLocation = (data) => API.post("/locations/", data);

export const updateLocation = async (id, locationData) => {
  const response = await axios.put(
    `${API_URL}/${id}`,
    locationData
  );

  return response.data;
};