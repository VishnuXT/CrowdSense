import React, { useState, useEffect } from "react";
import "./AddLocationPopup.css";
import { createLocation, getCategories } from "../../services/locationService";

const AddLocationPopup = ({ onClose, fetchLocations }) => {

  const [formData, setFormData] = useState({
    placeName: "",
    category: "",
    address: "",
    latitude: "",
    longitude: "",
    popularityScore: 50,
    imageUrl: "",
  });

  
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const response = await getCategories();
      setCategories(response.data);
    } catch (error) {
      console.error("Error loading categories:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const getPopularityScore = (level) => {
    switch (level) {
      case "Very Low":
        return 20;
      case "Low":
        return 40;
      case "Medium":
        return 60;
      case "High":
        return 80;
      case "Very High":
        return 100;
      default:
        return 60;
    }
  };

  const handleSubmit = async () => {
    try {
      if (
        !formData.placeName.trim() ||
        !formData.category ||
        !formData.address.trim() ||
        !formData.latitude.trim() ||
        !formData.longitude.trim() ||
        !formData.imageUrl.trim()
      ) {
        alert("Please fill all required fields");
        return;
      }

      const payload = {
        name: formData.placeName,
        address: formData.address,
        latitude: parseFloat(formData.latitude),
        longitude: parseFloat(formData.longitude),
        category_id: Number(formData.category),
        image_url: formData.imageUrl,
        popularity_score: getPopularityScore(formData.popularityLevel),
      };

      const response = await createLocation(payload);

      alert(response.data.message);

      if (fetchLocations) {
        await fetchLocations();
      }

      onClose();
    } catch (error) {
      console.error(error);
      alert("Failed to add location");
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-card">
        {/* Header */}

        <div className="popup-header">
          <h2>Add Location</h2>

          <button type="button" className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        {/* Body */}

        <div className="popup-body">
          <div className="form-group">
            <label>
              Place Name <span className="required">*</span>
            </label>

            <input
              type="text"
              name="placeName"
              placeholder="Enter place name"
              value={formData.placeName}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>
              Category <span className="required">*</span>
            </label>

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="">Select Category</option>

              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>
              Address <span className="required">*</span>
            </label>

            <textarea
              rows="4"
              name="address"
              placeholder="Enter full address"
              value={formData.address}
              onChange={handleChange}
            />
          </div>

          <div className="row">
            <div className="form-group">
              <label>
                Latitude <span className="required">*</span>
              </label>

              <input
                type="text"
                name="latitude"
                placeholder="Enter latitude"
                value={formData.latitude}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>
                Longitude <span className="required">*</span>
              </label>

              <input
                type="text"
                name="longitude"
                placeholder="Enter longitude"
                value={formData.longitude}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label>
              Popularity Level <span className="required">*</span>
            </label>

            <select
              name="popularityLevel"
              value={formData.popularityLevel}
              onChange={handleChange}
            >
              <option value="Very Low">Very Low</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Very High">Very High</option>
            </select>
          </div>

          <div className="form-group">
            <label>
              Location Image URL <span className="required">*</span>
            </label>

            <input
              type="text"
              name="imageUrl"
              placeholder="Enter location image URL (e.g. https://unsplash.com/...)"
              value={formData.imageUrl}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Status</label>

            <input type="text" value="Active" disabled />
          </div>
        </div>

        {/* Footer */}

        <div className="popup-footer">
          <button type="button" className="cancel-btn" onClick={onClose}>
            Cancel
          </button>

          <button type="button" className="add-btn" onClick={handleSubmit}>
            Add Location
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddLocationPopup;
