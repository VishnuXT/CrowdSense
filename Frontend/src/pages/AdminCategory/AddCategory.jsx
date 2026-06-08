import React, { useState } from "react";
import "./AddCategory.css";

const AddCategory = ({ onClose, onAdd }) => {
  const [category, setCategory] = useState({
    name: "",
    description: "",
    status: "ACTIVE",
  });

  const handleChange = (e) => {
    setCategory({
      ...category,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!category.name.trim()) {
      alert("Category name is required");
      return;
    }

    try {
      await onAdd(category);

      setCategory({
        name: "",
        description: "",
        status: "ACTIVE",
      });

      onClose();
    } catch (error) {
      console.log(error);
      alert("Failed to add category");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="add-category-modal">
        {/* HEADER */}

        <div className="modal-header">
          <h2>Add Category</h2>

          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        {/* FORM */}

        <form onSubmit={handleSubmit}>
          {/* CATEGORY NAME */}

          <div className="form-group">
            <label>
              Category Name <span>*</span>
            </label>

            <input
              type="text"
              name="name"
              placeholder="Enter category name"
              value={category.name}
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
              placeholder="Enter description"
              value={category.description}
              onChange={handleChange}
            />
          </div>

          {/* STATUS */}

          <div className="form-group">
            <label>Status</label>

            <input type="text" value="ACTIVE" disabled />
          </div>

          {/* FOOTER */}

          <div className="modal-footer">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>

            <button type="submit" className="add-btn">
              Add Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
