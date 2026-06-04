import React, { useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";

import "./AdminCategory.css";

import AddCategory from "./AddCategory";
import Addedit from "./Addedit";
import Adddel from "./Adddel";
import { useToast } from "../../components/Toast/ToastProvider";

const AdminCategory = () => {
  const { showToast } = useToast();
  const [showAddModal, setShowAddModal] = useState(false);

  const [showEditModal, setShowEditModal] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState(null);

  const [deleteId, setDeleteId] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");

  const [categories, setCategories] = useState([
    {
      id: 1,
      name: "Religious Places",
      description: "Places of worship and religious significance",
      status: "Active",
    },

    {
      id: 2,
      name: "Tourist Places",
      description: "Tourist attractions and popular visit locations",
      status: "Active",
    },

    {
      id: 3,
      name: "Commercial Areas",
      description: "Shopping malls and commercial hubs",
      status: "Inactive",
    },

    {
      id: 4,
      name: "Public Places",
      description: "Parks, grounds and public places",
      status: "Active",
    },
  ]);

  /* =========================
     ADD CATEGORY
  ========================= */

  const addCategory = (newCategory) => {
    setCategories((prev) => [...prev, newCategory]);
    showToast("Category added successfully");
  };

  /* =========================
     UPDATE CATEGORY
  ========================= */

  const updateCategory = (updatedCategory) => {
    setCategories(
      categories.map((cat) =>
        cat.id === updatedCategory.id ? updatedCategory : cat,
      ),
    );
    showToast("Category updated successfully");
  };

  /* =========================
     DELETE POPUP
  ========================= */

  const deleteCategory = (id) => {
    setDeleteId(id);

    setShowDeleteModal(true);
  };

  /* =========================
     CONFIRM DELETE
  ========================= */

  const confirmDelete = () => {
    setCategories(categories.filter((cat) => cat.id !== deleteId));

    setShowDeleteModal(false);

    setDeleteId(null);
    showToast("Category deleted successfully");
  };

  /* =========================
     SEARCH FILTER
  ========================= */

  const filteredCategories = categories
    .filter((category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.status.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="admin-category-page">
      {/* ================= HEADER ================= */}

      <div className="page-header">
        <div>
          <h2>Category Management</h2>

          <p>Add, edit and manage categories</p>
        </div>

        <button
          className="add-category-btn"
          onClick={() => setShowAddModal(true)}
        >
          + Add Category
        </button>
      </div>

      {/* ================= SEARCH ================= */}

      <div className="search-section">
        <input
          type="text"
          placeholder="Search category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      {/* ================= TABLE CARD ================= */}

      <div className="table-card">
        {/* Card Header */}

        <div className="table-header">
          <h3>Category List</h3>

          <div className="total-categories">
            Total Categories: {filteredCategories.length}
          </div>
        </div>

        {/* Table */}

        <div className="table-wrapper">
          <table className="category-table">
            <thead>
              <tr>
                <th>Category Name</th>

                <th>Description</th>

                <th>Status</th>

                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredCategories.length > 0 ? (
                filteredCategories.map((category) => (
                  <tr key={category.id}>
                    <td>{category.name}</td>

                    <td>{category.description}</td>

                    <td>
                      <span
                        className={`status ${
                          category.status === "Active" ? "active" : "inactive"
                        }`}
                      >
                        {category.status}
                      </span>
                    </td>

                    {/* ================= ACTIONS ================= */}

                    <td>
                      <div className="action-buttons">
                        {/* Edit */}

                        <button
                          className="edit-btn"
                          onClick={() => {
                            setSelectedCategory(category);

                            setShowEditModal(true);
                          }}
                        >
                          <FiEdit />
                        </button>

                        {/* Delete */}

                        <button
                          className="delete-btn"
                          onClick={() => deleteCategory(category.id)}
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="no-data">
                    No categories found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ================= ADD CATEGORY ================= */}

      {showAddModal && (
        <AddCategory
          onClose={() => setShowAddModal(false)}
          onAddCategory={addCategory}
        />
      )}

      {/* ================= EDIT CATEGORY ================= */}

      {showEditModal && selectedCategory && (
        <Addedit
          category={selectedCategory}
          onClose={() => setShowEditModal(false)}
          onUpdateCategory={updateCategory}
        />
      )}

      {/* ================= DELETE CATEGORY ================= */}

      {showDeleteModal && (
        <Adddel
          onClose={() => setShowDeleteModal(false)}
          onDelete={confirmDelete}
        />
      )}
    </div>
  );
};

export default AdminCategory;
