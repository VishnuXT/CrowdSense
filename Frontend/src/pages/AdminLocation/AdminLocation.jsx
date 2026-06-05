import React, { useState } from "react";
import "./AdminLocation.css";
import AddLocationPopup from "./AddLocationPopup";
import EditLocation from "./EditLocation";
import DeactivateConfirmModal from "../../components/DeactivateConfirmModal/DeactivateConfirmModal";
import StatusFilter from "../../components/StatusFilter/StatusFilter";
import { useToast } from "../../components/Toast/ToastProvider";

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

  const [locations, setLocations] = useState([
    {
      id: 1,
      placeName: "Sree Padmanabhaswamy Temple",
      category: "Religious Places",
      address: "West Nada, Fort, Thiruvananthapuram",
      latitude: "8.4850",
      longitude: "76.9496",
      popularityLevel: "High",
      imageUrl: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800",
      status: "Active",
    },
    {
      id: 2,
      placeName: "Kovalam Beach",
      category: "Tourist Places",
      address: "Kovalam, Thiruvananthapuram",
      latitude: "8.4003",
      longitude: "76.9780",
      popularityLevel: "Very High",
      imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
      status: "Active",
    },
    {
      id: 3,
      placeName: "Lulu Mall",
      category: "Commercial Areas",
      address: "NH 66, Kazhakkoottam, Thiruvananthapuram",
      latitude: "8.5603",
      longitude: "76.8870",
      popularityLevel: "High",
      imageUrl: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=800",
      status: "Inactive",
    },
    {
      id: 4,
      placeName: "Kanakakunnu Palace Ground",
      category: "Public Places",
      address: "Kanakakunnu, Thiruvananthapuram",
      latitude: "8.4972",
      longitude: "76.9523",
      popularityLevel: "Medium",
      imageUrl: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800",
      status: "Active",
    },
    {
      id: 5,
      placeName: "Attukal Temple",
      category: "Religious Places",
      address: "Attukal, Trivandrum",
      latitude: "8.4951",
      longitude: "76.9536",
      popularityLevel: "Medium",
      imageUrl: "https://images.unsplash.com/photo-1545239351-ef35f43d514b?w=800",
      status: "Inactive",
    },
    {
      id: 6,
      placeName: "Centre Square Mall",
      category: "Commercial Areas",
      address: "MG Road, Kochi",
      latitude: "9.9816",
      longitude: "76.2999",
      popularityLevel: "Medium",
      imageUrl: "https://images.unsplash.com/photo-1581553674786-63febb0e5db7?w=800",
      status: "Active",
    },
    {
      id: 7,
      placeName: "Shanghumugham Beach",
      category: "Tourist Places",
      address: "Shanghumugham, Trivandrum",
      latitude: "8.4822",
      longitude: "76.9123",
      popularityLevel: "Low",
      imageUrl: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=800",
      status: "Active",
    },
    {
      id: 8,
      placeName: "Mall of Travancore",
      category: "Commercial Areas",
      address: "Chackai, Trivandrum",
      latitude: "8.4887",
      longitude: "76.9492",
      popularityLevel: "Medium",
      imageUrl: "https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=800",
      status: "Active",
    },
  ]);

  // Add Location

  const addLocation = (newLocation) => {
    setLocations((prevLocations) => [
      ...prevLocations,
      newLocation,
    ]);
    showToast("Location added successfully");
  };

  // Edit Location

  const updateLocation = (updatedLocation) => {
    setLocations(
      locations.map((location) =>
        location.id === updatedLocation.id
          ? updatedLocation
          : location
      )
    );
    showToast("Location updated successfully");
  };

  const confirmDeactivate = () => {
    setLocations((prev) =>
      prev.map((location) =>
        location.id === deactivateId
          ? { ...location, status: "Inactive" }
          : location,
      ),
    );
    setShowDeactivatePopup(false);
    setDeactivateId(null);
    showToast("Location deactivated successfully");
  };

  const reactivateLocation = (id) => {
    setLocations((prev) =>
      prev.map((location) =>
        location.id === id ? { ...location, status: "Active" } : location,
      ),
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
    .sort((a, b) =>
      a.placeName.localeCompare(b.placeName)
    );

  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredLocations.length / itemsPerPage);
  const activePage = Math.min(currentPage, totalPages || 1);
  const indexOfLastItem = activePage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentLocations = filteredLocations.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="admin-location-page">

      {/* Header */}

      <div className="page-header">
        <div>
          <h2>Location Management</h2>
        </div>

        <button
          className="add-location-btn"
          onClick={() => setShowPopup(true)}
        >
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
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
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
          onAddLocation={addLocation}
        />
      )}

      {/* Edit Popup */}

      {showEditPopup && selectedLocation && (
        <EditLocation
          location={selectedLocation}
          onClose={() => setShowEditPopup(false)}
          onUpdateLocation={updateLocation}
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
