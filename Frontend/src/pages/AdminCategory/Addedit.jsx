import React, { useState } from "react";

import "./Addedit.css";

const Addedit = ({ category, onClose, onUpdate }) => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await onUpdate({
        id: category.id,
        name: formData.name,
        description: formData.description,
      });

      onClose();
    } catch (error) {
      console.log(error);

      alert("Failed to update category");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="edit-category-modal">
        {/* HEADER */}

        <div className="modal-header">
          <h2>Edit Category</h2>

          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        {/* FORM */}

        <form onSubmit={handleSubmit}>
          {/* CATEGORY NAME */}

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

          {/* DESCRIPTION */}

          <div className="form-group">
            <label>Description</label>

            <textarea
              rows="4"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          {/* FOOTER */}

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
