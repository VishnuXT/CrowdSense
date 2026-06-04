import React, { useState } from "react";
import "./AdminLocation.css";
import AddLocationPopup from "./AddLocationPopup";
import EditLocation from "./EditLocation";
import LocationDelete from "./DeleteLocation";
import { useToast } from "../../components/Toast/ToastProvider";

import { FiEdit, FiTrash2 } from "react-icons/fi";

const AdminLocation = () => {
  const { showToast } = useToast();
  const [showPopup, setShowPopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  const [selectedLocation, setSelectedLocation] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");

  const [locations, setLocations] = useState([
    {
      id: 1,
      placeName: "Sree Padmanabhaswamy Temple",
      category: "Religious Places",
      address: "West Nada, Fort, Thiruvananthapuram",
      latitude: "8.4850",
      longitude: "76.9496",
      status: "Active",
    },
    {
      id: 2,
      placeName: "Kovalam Beach",
      category: "Tourist Places",
      address: "Kovalam, Thiruvananthapuram",
      latitude: "8.4003",
      longitude: "76.9780",
      status: "Active",
    },
    {
      id: 3,
      placeName: "Lulu Mall",
      category: "Commercial Areas",
      address: "NH 66, Kazhakkoottam, Thiruvananthapuram",
      latitude: "8.5603",
      longitude: "76.8870",
      status: "Inactive",
    },
    {
      id: 4,
      placeName: "Kanakakunnu Palace Ground",
      category: "Public Places",
      address: "Kanakakunnu, Thiruvananthapuram",
      latitude: "8.4972",
      longitude: "76.9523",
      status: "Active",
    },
    {
      id: 5,
      placeName: "Attukal Temple",
      category: "Religious Places",
      address: "Attukal, Trivandrum",
      latitude: "8.4951",
      longitude: "76.9536",
      status: "Inactive",
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

  // Delete Location

  const deleteLocation = () => {
    setLocations(
      locations.filter(
        (location) => location.id !== deleteId
      )
    );

    setShowDeletePopup(false);
    setDeleteId(null);
    showToast("Location deleted successfully");
  };

  // Search + Sort

  const filteredLocations = locations
    .filter(
      (location) =>
        location.placeName
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        location.category
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        location.status
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        location.address
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
    )
    .sort((a, b) =>
      a.placeName.localeCompare(b.placeName)
    );

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

      <div className="search-section">
        <input
          type="text"
          placeholder="Search location..."
          className="search-input"
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(e.target.value)
          }
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
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>

              {filteredLocations.map((location) => (
                <tr key={location.id}>

                  <td>{location.placeName}</td>

                  <td>{location.category}</td>

                  <td>{location.address}</td>

                  <td>{location.latitude}</td>

                  <td>{location.longitude}</td>

                  <td>
                    <span
                      className={`status ${
                        location.status === "Active"
                          ? "active"
                          : "inactive"
                      }`}
                    >
                      {location.status}
                    </span>
                  </td>

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
                        className="delete-btn"
                        onClick={() => {
                          setDeleteId(location.id);
                          setShowDeletePopup(true);
                        }}
                      >
                        <FiTrash2 color="#ef4444" />
                      </button>

                    </div>
                  </td>

                </tr>
              ))}

              {filteredLocations.length === 0 && (
                <tr>
                  <td colSpan="7" className="no-data">
                    No locations found
                  </td>
                </tr>
              )}

            </tbody>

          </table>

        </div>
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

      {showDeletePopup && (
        <LocationDelete
          onClose={() => {
            setShowDeletePopup(false);
            setDeleteId(null);
          }}
          onDelete={deleteLocation}
        />
      )}

    </div>
  );
};

export default AdminLocation;
