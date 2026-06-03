import React, { useState } from "react";
import "./AddCategory.css";

const AddCategory = ({ onClose, onAddCategory }) => {
  const [category, setCategory] = useState({
    name: "",
    description: "",
    status: "Active",
  });

  const handleChange = (e) => {
    setCategory({
      ...category,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!category.name.trim()) {
      alert("Category Name is required");
      return;
    }

    const newCategory = {
      id: Date.now(),
      name: category.name,
      description: category.description,
      status: "Active",
    };

    onAddCategory(newCategory);

    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="add-category-modal">
        <div className="modal-header">
          <h2>Add Category</h2>

          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
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

          <div className="form-group">
            <label>Status</label>

            <input type="text" value="Active" disabled />
          </div>

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
