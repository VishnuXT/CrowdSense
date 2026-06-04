import React, { useState } from "react";
import "./EditLocation.css";

const EditLocation = ({
  location,
  onClose,
  onUpdateLocation,
}) => {
  const [formData, setFormData] = useState({
    placeName: location.placeName,
    category: location.category,
    status: location.status,
    address: location.address,
    latitude: location.latitude,
    longitude: location.longitude,
    popularityLevel: location.popularityLevel || "Medium",
    imageUrl: location.imageUrl || "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onUpdateLocation({
      ...location,
      ...formData,
    });

    onClose();
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

          <div className="row">

            <div className="form-group">
              <label>Category *</label>

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                <option>Religious Places</option>
                <option>Tourist Places</option>
                <option>Commercial Areas</option>
                <option>Public Places</option>
              </select>
            </div>

            <div className="form-group">
              <label>Status *</label>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>

          </div>

          <div className="form-group">
            <label>Address *</label>

            <textarea
              rows="4"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </div>

          <div className="row">

            <div className="form-group">
              <label>Latitude *</label>

              <input
                type="text"
                name="latitude"
                value={formData.latitude}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Longitude *</label>

              <input
                type="text"
                name="longitude"
                value={formData.longitude}
                onChange={handleChange}
              />
            </div>

          </div>

          <div className="form-group">
            <label>Popularity Level *</label>

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
            <label>Location Image URL *</label>

            <input
              type="text"
              name="imageUrl"
              placeholder="Enter location image URL"
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