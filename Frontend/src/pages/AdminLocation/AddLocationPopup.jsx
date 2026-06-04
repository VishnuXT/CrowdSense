import React, { useState } from "react";
import "./AddLocationPopup.css";

const AddLocationPopup = ({ onClose, onAddLocation }) => {
  const [formData, setFormData] = useState({
    placeName: "",
    category: "",
    address: "",
    latitude: "",
    longitude: "",
    popularityLevel: "Medium",
    imageUrl: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    // Validation

    if (
      !formData.placeName.trim() ||
      !formData.category.trim() ||
      !formData.address.trim() ||
      !formData.latitude.trim() ||
      !formData.longitude.trim() ||
      !formData.popularityLevel.trim() ||
      !formData.imageUrl.trim()
    ) {
      alert("Please fill all required fields");
      return;
    }

    const newLocation = {
      id: Date.now(),
      placeName: formData.placeName,
      category: formData.category,
      address: formData.address,
      latitude: formData.latitude,
      longitude: formData.longitude,
      popularityLevel: formData.popularityLevel,
      imageUrl: formData.imageUrl,
      status: "Active",
    };

    // Add location to AdminLocation table

    if (onAddLocation) {
      onAddLocation(newLocation);
    }

    // Close popup

    onClose();
  };

  return (
    <div className="popup-overlay">
      <div className="popup-card">

        {/* Header */}

        <div className="popup-header">
          <h2>Add Location</h2>

          <button
            type="button"
            className="close-btn"
            onClick={onClose}
          >
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

              <option value="Religious Places">
                Religious Places
              </option>

              <option value="Tourist Places">
                Tourist Places
              </option>

              <option value="Commercial Areas">
                Commercial Areas
              </option>

              <option value="Public Places">
                Public Places
              </option>
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
            <label>
              Status
            </label>

            <input
              type="text"
              value="Active"
              disabled
            />
          </div>

        </div>

        {/* Footer */}

        <div className="popup-footer">

          <button
            type="button"
            className="cancel-btn"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            type="button"
            className="add-btn"
            onClick={handleSubmit}
          >
            Add Location
          </button>

        </div>

      </div>
    </div>
  );
};

export default AddLocationPopup;