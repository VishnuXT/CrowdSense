import React, { useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";

import "./AdminCategory.css";

import AddCategory from "./AddCategory";
import Addedit from "./Addedit";
import DeactivateConfirmModal from "../../components/DeactivateConfirmModal/DeactivateConfirmModal";
import StatusFilter from "../../components/StatusFilter/StatusFilter";
import { useToast } from "../../components/Toast/ToastProvider";

const AdminCategory = () => {
  const { showToast } = useToast();
  const [showAddModal, setShowAddModal] = useState(false);

  const [showEditModal, setShowEditModal] = useState(false);

  const [showDeactivateModal, setShowDeactivateModal] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState(null);

  const [deactivateId, setDeactivateId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("Active");
  const [currentPage, setCurrentPage] = useState(1);

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

    {
      id: 5,
      name: "Entertainment",
      description: "Movie theaters, malls and gaming zones",
      status: "Active",
    },

    {
      id: 6,
      name: "Sports & Parks",
      description: "Stadiums, sports complexes and recreational parks",
      status: "Active",
    },

    {
      id: 7,
      name: "Nature & Outdoors",
      description: "Hill stations, waterfalls and forest reserves",
      status: "Inactive",
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

  const openDeactivateModal = (id) => {
    setDeactivateId(id);
    setShowDeactivateModal(true);
  };

  const confirmDeactivate = () => {
    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === deactivateId ? { ...cat, status: "Inactive" } : cat,
      ),
    );
    setShowDeactivateModal(false);
    setDeactivateId(null);
    showToast("Category deactivated successfully");
  };

  const reactivateCategory = (id) => {
    setCategories((prev) =>
      prev.map((cat) => (cat.id === id ? { ...cat, status: "Active" } : cat)),
    );
    showToast("Category reactivated successfully");
  };

  /* =========================
     SEARCH FILTER
  ========================= */

  const filteredCategories = categories
    .filter((category) => {
      const matchesSearch =
        category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        category.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = category.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => a.name.localeCompare(b.name));

  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);
  const activePage = Math.min(currentPage, totalPages || 1);
  const indexOfLastItem = activePage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCategories = filteredCategories.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="admin-category-page">
      {/* ================= HEADER ================= */}

      <div className="page-header">
        <div>
          <h2>Category Management</h2>

        </div>

        <button
          className="add-category-btn"
          onClick={() => setShowAddModal(true)}
        >
          + Add Category
        </button>
      </div>

      {/* ================= SEARCH ================= */}

      <div className="search-section filters-row">
        <input
          type="text"
          placeholder="Search category..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="search-input"
        />
        <StatusFilter
          value={statusFilter}
          onChange={(value) => {
            setStatusFilter(value);
            setCurrentPage(1);
          }}
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

                {/* <th>Status</th> */}

                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {currentCategories.length > 0 ? (
                currentCategories.map((category) => (
                  <tr key={category.id}>
                    <td>{category.name}</td>

                    <td>{category.description}</td>

                    {/* <td>
                      <span
                        className={`status ${
                          category.status === "Active" ? "active" : "inactive"
                        }`}
                      >
                        {category.status}
                      </span>
                    </td> */}

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
                          type="button"
                          className={
                            category.status === "Active"
                              ? "delete-btn"
                              : "delete-btn reactivate-btn"
                          }
                          title={
                            category.status === "Active"
                              ? "Deactivate category"
                              : "Reactivate category"
                          }
                          onClick={() => {
                            if (category.status === "Active") {
                              openDeactivateModal(category.id);
                            } else {
                              reactivateCategory(category.id);
                            }
                          }}
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

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="pagination">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={activePage === 1}
              className="page-btn prev-btn"
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`page-btn ${activePage === page ? "active" : ""}`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={activePage === totalPages}
              className="page-btn next-btn"
            >
              Next
            </button>
          </div>
        )}
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

      {showDeactivateModal && (
        <DeactivateConfirmModal
          entityLabel="Category"
          onClose={() => {
            setShowDeactivateModal(false);
            setDeactivateId(null);
          }}
          onConfirm={confirmDeactivate}
        />
      )}
    </div>
  );
};

export default AdminCategory;
