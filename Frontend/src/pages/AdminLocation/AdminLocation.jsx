import React, { useState, useEffect } from "react";
import "./AdminLocation.css";
import AddLocationPopup from "./AddLocationPopup";
import EditLocation from "./EditLocation";
import DeactivateConfirmModal from "../../components/DeactivateConfirmModal/DeactivateConfirmModal";
import StatusFilter from "../../components/StatusFilter/StatusFilter";
import { useToast } from "../../components/Toast/ToastProvider";
import { getLocations } from "../../services/locationService";

import { FiEdit, FiTrash2 } from "react-icons/fi";

const AdminLocation = () => {
  const { showToast } = useToast();
  const [showPopup, setShowPopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [showDeactivatePopup, setShowDeactivatePopup] = useState(false);

  const [selectedLocation, setSelectedLocation] = useState(null);
  const [deactivateId, setDeactivateId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("Active");
  const [currentPage, setCurrentPage] = useState(1);

  const [locations, setLocations] = useState([]);

  const getPopularityLevel = (score) => {
    if (score < 45) return "Low";
    if (score <= 75) return "Medium";
    return "High";
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    try {
      const response = await getLocations();

      const formattedLocations = response.data.map((location) => ({
        id: location.id,

        name: location.name,
        placeName: location.name,

        category: location.category_name || "",
        category_id: location.category_id,

        address: location.address,

        latitude: location.latitude,
        longitude: location.longitude,

        popularity_score: location.popularity_score,
        popularityLevel: location.popularity_score,

        image_url: location.image_url || "",
        imageUrl: location.image_url || "",

        status: "Active",
      }));

      setLocations(formattedLocations);
    } catch (error) {
      console.error(error);
    }
  };

  // Add Location

  const addLocation = (newLocation) => {
    setLocations((prevLocations) => [...prevLocations, newLocation]);
    showToast("Location added successfully");
  };

  // Edit Location

  const updateLocation = (updatedLocation) => {
    setLocations(
      locations.map((location) =>
        location.id === updatedLocation.id ? updatedLocation : location
      )
    );
    showToast("Location updated successfully");
  };

  const confirmDeactivate = () => {
    setLocations((prev) =>
      prev.map((location) =>
        location.id === deactivateId
          ? { ...location, status: "Inactive" }
          : location
      )
    );
    setShowDeactivatePopup(false);
    setDeactivateId(null);
    showToast("Location deactivated successfully");
  };

  const reactivateLocation = (id) => {
    setLocations((prev) =>
      prev.map((location) =>
        location.id === id ? { ...location, status: "Active" } : location
      )
    );
    showToast("Location reactivated successfully");
  };

  // Search + Sort

  const filteredLocations = locations
    .filter((location) => {
      const query = searchTerm.toLowerCase();
      const matchesSearch =
        location.placeName.toLowerCase().includes(query) ||
        location.category.toLowerCase().includes(query) ||
        location.address.toLowerCase().includes(query);
      const matchesStatus = location.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => a.placeName.localeCompare(b.placeName));

  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredLocations.length / itemsPerPage);
  const activePage = Math.min(currentPage, totalPages || 1);
  const indexOfLastItem = activePage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentLocations = filteredLocations.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  return (
    <div className="admin-location-page">
      {/* Header */}

      <div className="page-header">
        <div>
          <h2>Location Management</h2>
        </div>

        <button className="add-location-btn" onClick={() => setShowPopup(true)}>
          + Add Location
        </button>
      </div>

      {/* Search */}

      <div className="search-section filters-row">
        <input
          type="text"
          placeholder="Search location..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
        <StatusFilter
          value={statusFilter}
          onChange={(value) => {
            setStatusFilter(value);
            setCurrentPage(1);
          }}
        />
      </div>

      {/* Table Card */}

      <div className="table-card">
        <div className="table-header">
          <h3>Location List</h3>

          <div className="total-locations">
            Total Locations : {filteredLocations.length}
          </div>
        </div>

        <div className="table-wrapper">
          <table className="location-table">
            <thead>
              <tr>
                <th>Place Name</th>
                <th>Category</th>
                <th>Address</th>
                <th>Latitude</th>
                <th>Longitude</th>
                <th>Popularity</th>
                {/* <th>Status</th> */}
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {currentLocations.map((location) => (
                <tr key={location.id}>
                  <td>{location.placeName}</td>

                  <td>{location.category}</td>

                  <td>{location.address}</td>

                  <td>{location.latitude}</td>

                  <td>{location.longitude}</td>

                  <td>{location.popularityLevel || "Medium"}</td>

                  {/* <td>
                    <span
                      className={`status ${
                        location.status === "Active"
                          ? "active"
                          : "inactive"
                      }`}
                    >
                      {location.status}
                    </span>
                  </td> */}

                  <td>
                    <div className="action-buttons">
                      <button
                        className="edit-btn"
                        onClick={() => {
                          setSelectedLocation(location);
                          setShowEditPopup(true);
                        }}
                      >
                        <FiEdit color="#2563eb" />
                      </button>

                      <button
                        type="button"
                        className={
                          location.status === "Active"
                            ? "delete-btn"
                            : "delete-btn reactivate-btn"
                        }
                        title={
                          location.status === "Active"
                            ? "Deactivate location"
                            : "Reactivate location"
                        }
                        onClick={() => {
                          if (location.status === "Active") {
                            setDeactivateId(location.id);
                            setShowDeactivatePopup(true);
                          } else {
                            reactivateLocation(location.id);
                          }
                        }}
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {currentLocations.length === 0 && (
                <tr>
                  <td colSpan="8" className="no-data">
                    No locations found
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
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={activePage === totalPages}
              className="page-btn next-btn"
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* Add Location Popup */}

      {showPopup && (
        <AddLocationPopup
          onClose={() => setShowPopup(false)}
          fetchLocations={fetchLocations}
        />
      )}

      {/* Edit Popup */}

      {showEditPopup && selectedLocation && (
        <EditLocation
          location={selectedLocation}
          onClose={() => setShowEditPopup(false)}
          onUpdateLocation={fetchLocations}
        />
      )}

      {/* Delete Popup */}

      {showDeactivatePopup && (
        <DeactivateConfirmModal
          entityLabel="Location"
          onClose={() => {
            setShowDeactivatePopup(false);
            setDeactivateId(null);
          }}
          onConfirm={confirmDeactivate}
        />
      )}
    </div>
  );
};

export default AdminLocation;
