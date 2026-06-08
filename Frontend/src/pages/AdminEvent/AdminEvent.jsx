import React, { useState, useEffect } from "react";
import "./AdminEvent.css";

import { FiEdit, FiTrash2 } from "react-icons/fi";

import AddEvent from "./Addevent";
import EditEvent from "./Editevent";
import DeactivateConfirmModal from "../../components/DeactivateConfirmModal/DeactivateConfirmModal";
import StatusFilter from "../../components/StatusFilter/StatusFilter";
import { useToast } from "../../components/Toast/ToastProvider";

const API_BASE = "http://localhost:8000/api/events";

const AdminEvent = () => {
  const { showToast } = useToast();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showEditPopup, setShowEditPopup] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showDeactivateModal, setShowDeactivateModal] = useState(false);
  const [deactivateId, setDeactivateId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("Active");
  const [currentPage, setCurrentPage] = useState(1);

  /* =========================
     FETCH EVENTS FROM API
  ========================= */
  const fetchEvents = async () => {
    try {
      const res = await fetch(`${API_BASE}/`);
      const data = await res.json();
      setEvents(data);
    } catch (err) {
      console.error("Failed to fetch events:", err);
      showToast("Failed to load events");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  /* =========================
     EDIT EVENT
  ========================= */

  const handleEdit = (event) => {
    setSelectedEvent(event);
    setShowEditPopup(true);
  };

  /* =========================
     DELETE / DEACTIVATE EVENT
  ========================= */

  const openDeactivateModal = (id) => {
    setDeactivateId(id);
    setShowDeactivateModal(true);
  };

  const confirmDeactivate = async () => {
    try {
      await fetch(`${API_BASE}/${deactivateId}`, { method: "DELETE" });
      await fetchEvents();
      showToast("Event deactivated successfully");
    } catch (err) {
      showToast("Failed to deactivate event");
    }
    setShowDeactivateModal(false);
    setDeactivateId(null);
  };

  const reactivateEvent = async (id) => {
    try {
      await fetch(`${API_BASE}/${id}/reactivate`, { method: "PATCH" });
      await fetchEvents();
      showToast("Event reactivated successfully");
    } catch (err) {
      showToast("Failed to reactivate event");
    }
  };

  /* =========================
     SEARCH & FILTER
  ========================= */

  const filteredEvents = events.filter((event) => {
    const query = searchTerm.toLowerCase();
    const matchesSearch =
      event.eventName.toLowerCase().includes(query) ||
      event.eventType.toLowerCase().includes(query) ||
      event.location.toLowerCase().includes(query) ||
      event.crowdLevel.toLowerCase().includes(query);
    const matchesStatus = event.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);
  const activePage = Math.min(currentPage, totalPages || 1);
  const indexOfLastItem = activePage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentEvents = filteredEvents.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="admin-event-page">
      {/* ================= HEADER ================= */}

      <div className="page-header">
        <div>
          <h2>Event Management</h2>

          <p>Manage and monitor all events</p>
        </div>

        <AddEvent
          onEventAdded={() => {
            fetchEvents();
            showToast("Event added successfully");
          }}
        />
      </div>

      {/* ================= SEARCH ================= */}

      <div className="search-section filters-row">
        <input
          type="text"
          placeholder="Search events..."
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

      {/* ================= TABLE CARD ================= */}

      <div className="table-card">
        {/* Header */}

        <div className="table-header">
          <h3>Event List</h3>

          <div className="total-events">
            Total Events: {filteredEvents.length}
          </div>
        </div>

        {/* Table */}

        <div className="table-wrapper">
          {loading ? (
            <div className="no-data">Loading events...</div>
          ) : (
            <table className="event-table">
              <thead>
                <tr>
                  <th>Event Name</th>

                  <th>Type</th>

                  <th>Location</th>

                  <th>Date</th>

                  <th>Crowd</th>

                  {/* <th>Status</th> */}

                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {currentEvents.length > 0 ? (
                  currentEvents.map((event) => (
                    <tr key={event.id}>
                      <td>{event.eventName}</td>

                      <td>{event.eventType}</td>

                      <td>{event.location}</td>

                      <td>{event.eventDate}</td>

                      <td>
                        <span
                          className={`crowd-level ${event.crowdLevel
                            .toLowerCase()
                            .replace(" ", "-")}`}
                        >
                          {event.crowdLevel}
                        </span>
                      </td>

                      {/* ================= ACTIONS ================= */}

                      <td>
                        <div className="action-buttons">
                          {/* Edit */}

                          <button
                            className="edit-btn"
                            onClick={() => handleEdit(event)}
                          >
                            <FiEdit />
                          </button>

                          {/* Delete / Reactivate */}

                          <button
                            type="button"
                            className={
                              event.status === "Active"
                                ? "delete-btn"
                                : "delete-btn reactivate-btn"
                            }
                            title={
                              event.status === "Active"
                                ? "Deactivate event"
                                : "Reactivate event"
                            }
                            onClick={() => {
                              if (event.status === "Active") {
                                openDeactivateModal(event.id);
                              } else {
                                reactivateEvent(event.id);
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
                    <td colSpan="6" className="no-data">
                      No Events Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
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

      {/* ================= EDIT EVENT ================= */}

      <EditEvent
        showEditPopup={showEditPopup}
        setShowEditPopup={setShowEditPopup}
        selectedEvent={selectedEvent}
        onEventUpdated={() => {
          fetchEvents();
          showToast("Event updated successfully");
        }}
      />

      {/* ================= DELETE EVENT ================= */}

      {showDeactivateModal && (
        <DeactivateConfirmModal
          entityLabel="Event"
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

export default AdminEvent;
