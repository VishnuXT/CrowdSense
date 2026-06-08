import React, { useEffect, useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";

import "./AdminCategory.css";

import AddCategory from "./AddCategory";
import Addedit from "./Addedit";

import DeactivateConfirmModal from "../../components/DeactivateConfirmModal/DeactivateConfirmModal";
import StatusFilter from "../../components/StatusFilter/StatusFilter";

import { useToast } from "../../components/Toast/ToastProvider";

import {
  getCategories,
  createCategory,
  updateCategoryApi,
  deactivateCategoryApi,
} from "../../services/categoryService";

const AdminCategory = () => {
  const { showToast } = useToast();

  const [showAddModal, setShowAddModal] = useState(false);

  const [showEditModal, setShowEditModal] = useState(false);

  const [showDeactivateModal, setShowDeactivateModal] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState(null);

  const [deactivateId, setDeactivateId] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");

  const [statusFilter, setStatusFilter] = useState("ACTIVE");

  const [currentPage, setCurrentPage] = useState(1);

  const [categories, setCategories] = useState([]);

  /*
  =========================
  FETCH CATEGORIES
  =========================
  */

  const fetchCategories = async () => {
    try {
      const response = await getCategories();

      console.log(response.data);

      setCategories(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  /*
  =========================
  ADD CATEGORY
  =========================
  */

  const addCategory = async (newCategory) => {
    try {
      await createCategory(newCategory);

      fetchCategories();

      setShowAddModal(false);

      showToast("Category added successfully");
    } catch (error) {
      console.log(error);

      showToast("Failed to add category");
    }
  };

  /*
  =========================
  UPDATE CATEGORY
  =========================
  */

  const updateCategory = async (updatedCategory) => {
    try {
      await updateCategoryApi(updatedCategory.id, {
        name: updatedCategory.name,
        description: updatedCategory.description,
      });

      fetchCategories();

      setShowEditModal(false);

      showToast("Category updated successfully");
    } catch (error) {
      console.log(error);

      showToast("Failed to update category");
    }
  };

  /*
  =========================
  OPEN DELETE MODAL
  =========================
  */

  const openDeactivateModal = (id) => {
    setDeactivateId(id);

    setShowDeactivateModal(true);
  };

  /*
  =========================
  DELETE CATEGORY
  =========================
  */

  const confirmDeactivate = async () => {
    try {
      await deactivateCategoryApi(deactivateId);

      fetchCategories();

      setShowDeactivateModal(false);

      setDeactivateId(null);

      showToast("Category deactivated successfully");
    } catch (error) {
      console.log(error);

      showToast("Failed to deactivate category");
    }
  };

  /*
  =========================
  FILTER
  =========================
  */

  const filteredCategories = categories
    .filter((category) => {
      const matchesSearch =
        category.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        category.description?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        category.status?.toLowerCase() === statusFilter.toLowerCase();

      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => a.name.localeCompare(b.name));

  /*
  =========================
  PAGINATION
  =========================
  */

  const itemsPerPage = 5;

  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);

  const activePage = Math.min(currentPage, totalPages || 1);

  const indexOfLastItem = activePage * itemsPerPage;

  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentCategories = filteredCategories.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );

  return (
    <div className="admin-category-page">
      {/* HEADER */}

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

      {/* SEARCH */}

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

      {/* TABLE */}

      <div className="table-card">
        <div className="table-header">
          <h3>Category List</h3>

          <div className="total-categories">
            Total Categories: {filteredCategories.length}
          </div>
        </div>

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
            {currentCategories.length > 0 ? (
              currentCategories.map((category) => (
                <tr key={category.id}>
                  <td>{category.name}</td>

                  <td>{category.description}</td>

                  <td>{category.status}</td>

                  <td className="action-buttons">
                    <button
                      className="edit-btn"
                      onClick={() => {
                        setSelectedCategory(category);

                        setShowEditModal(true);
                      }}
                    >
                      <FiEdit />
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => openDeactivateModal(category.id)}
                    >
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No categories found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ADD CATEGORY */}

      {showAddModal && (
        <AddCategory
          onClose={() => setShowAddModal(false)}
          onAdd={addCategory}
        />
      )}

      {/* EDIT CATEGORY */}

      {showEditModal && (
        <Addedit
          category={selectedCategory}
          onClose={() => setShowEditModal(false)}
          onUpdate={updateCategory}
        />
      )}

      {/* DELETE MODAL */}

      {showDeactivateModal && (
        <DeactivateConfirmModal
          onClose={() => setShowDeactivateModal(false)}
          onConfirm={confirmDeactivate}
        />
      )}
    </div>
  );
};

export default AdminCategory;
