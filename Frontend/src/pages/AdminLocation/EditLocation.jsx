import React, { useState, useEffect } from "react";
import axios from "axios";
import "./EditLocation.css";

const EditLocation = ({
  location,
  onClose,
  onUpdateLocation,
}) => {

  const [categories, setCategories] = useState([]);

  const [formData, setFormData] = useState({
    placeName: "",
    category: "",
    address: "",
    latitude: "",
    longitude: "",
    popularityLevel: "",
    imageUrl: "",
  });

  useEffect(() => {
    fetchCategories();
    fetchLocationDetails();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/categories/"
      );

      setCategories(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchLocationDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/locations/${location.id}`
      );

      const data = response.data;

      setFormData({
        placeName: data.name || "",
        category: data.category_id ? String(data.category_id) : "",
        address: data.address || "",
        latitude: data.latitude || "",
        longitude: data.longitude || "",
        popularityLevel: data.popularity_score || "",
        imageUrl: data.image_url || "",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        name: formData.placeName,
        address: formData.address,
        latitude: parseFloat(formData.latitude),
        longitude: parseFloat(formData.longitude),
        category_id: parseInt(formData.category),
        popularity_score: parseInt(formData.popularityLevel),
        image_url: formData.imageUrl,
      };

      await axios.put(
        `http://localhost:8000/api/locations/${location.id}`,
        payload
      );

      alert("Location updated successfully");

      if (onUpdateLocation) {
        onUpdateLocation();
      }

      onClose();

    } catch (error) {
      console.error(error);
      alert("Failed to update location");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="edit-location-modal">

        <div className="modal-header">
          <h2>Edit Location</h2>

          <button
            className="close-btn"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label>Place Name *</label>

            <input
              type="text"
              name="placeName"
              value={formData.placeName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Category *</label>

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">
                Select Category
              </option>

              {categories.map((cat) => (
                <option
                  key={cat.id}
                  value={cat.id}
                >
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Address *</label>

            <textarea
              rows="4"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>

          <div className="row">

            <div className="form-group">
              <label>Latitude *</label>

              <input
                type="number"
                step="any"
                name="latitude"
                value={formData.latitude}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Longitude *</label>

              <input
                type="number"
                step="any"
                name="longitude"
                value={formData.longitude}
                onChange={handleChange}
                required
              />
            </div>

          </div>

          <div className="form-group">
            <label>Popularity Score *</label>

            <input
              type="number"
              name="popularityLevel"
              value={formData.popularityLevel}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Image URL *</label>

            <input
              type="text"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              required
            />
          </div>

          <div className="modal-footer">

            <button
              type="button"
              className="cancel-btn"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="update-btn"
            >
              Update Location
            </button>

          </div>

        </form>

      </div>
    </div>
  );
};

export default EditLocation;