import React, { useState } from "react";
import "./Addedit.css";

const Addedit = ({ category, onClose, onUpdateCategory }) => {
  const [formData, setFormData] = useState({
    name: category.name,
    description: category.description,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onUpdateCategory({
      ...category,
      name: formData.name,
      description: formData.description,
    });

    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="edit-category-modal">
        <div className="modal-header">
          <h2>Edit Category</h2>

          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Category Name</label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Description</label>

            <textarea
              rows="4"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div className="modal-footer">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>

            <button type="submit" className="update-btn">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Addedit;
