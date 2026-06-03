import React, { useState } from "react";
import "./AdminEvent.css";

import { FiEdit, FiTrash2 } from "react-icons/fi";

import AddEvent from "./Addevent";
import EditEvent from "./Editevent";
import Adddel from "./Adddel";

const AdminEvent = () => {
  const [events, setEvents] = useState([
    {
      id: 1,
      eventName: "Attukal Pongala",
      eventType: "Religious",
      location: "Attukal Temple",
      eventDate: "2026-03-15",
      startTime: "06:00",
      endTime: "22:00",
      crowdLevel: "High",
      status: "Active",
      description:
        "Annual religious festival attended by thousands of devotees.",
    },

    {
      id: 2,
      eventName: "Kochi Music Fest",
      eventType: "Music",
      location: "Kochi Ground",
      eventDate: "2026-04-20",
      startTime: "17:00",
      endTime: "23:00",
      crowdLevel: "Medium",
      status: "Active",
      description: "Live music performances by famous artists and bands.",
    },

    {
      id: 3,
      eventName: "State Football League",
      eventType: "Sports",
      location: "Greenfield Stadium",
      eventDate: "2026-05-10",
      startTime: "15:00",
      endTime: "20:00",
      crowdLevel: "High",
      status: "Inactive",
      description: "Regional football championship with multiple teams.",
    },
  ]);

  const [showEditPopup, setShowEditPopup] = useState(false);

  const [selectedEvent, setSelectedEvent] = useState(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [deleteId, setDeleteId] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");

  /* =========================
     EDIT EVENT
  ========================= */

  const handleEdit = (event) => {
    setSelectedEvent(event);

    setShowEditPopup(true);
  };

  /* =========================
     DELETE EVENT
  ========================= */

  const handleDelete = (id) => {
    setDeleteId(id);

    setShowDeleteModal(true);
  };

  /* =========================
     CONFIRM DELETE
  ========================= */

  const confirmDelete = () => {
    setEvents(events.filter((event) => event.id !== deleteId));

    setShowDeleteModal(false);

    setDeleteId(null);
  };

  /* =========================
     SEARCH
  ========================= */

  const filteredEvents = events.filter((event) =>
    event.eventName.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="admin-event-page">
      {/* ================= HEADER ================= */}

      <div className="page-header">
        <div>
          <h2>Event Management</h2>

          <p>Manage and monitor all events</p>
        </div>

        <AddEvent events={events} setEvents={setEvents} />
      </div>

      {/* ================= SEARCH ================= */}

      <div className="search-section">
        <input
          type="text"
          placeholder="Search events..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
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
          <table className="event-table">
            <thead>
              <tr>
                <th>Event Name</th>

                <th>Type</th>

                <th>Location</th>

                <th>Date</th>

                <th>Crowd</th>

                <th>Status</th>

                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredEvents.length > 0 ? (
                filteredEvents.map((event) => (
                  <tr key={event.id}>
                    <td>{event.eventName}</td>

                    <td>{event.eventType}</td>

                    <td>{event.location}</td>

                    <td>{event.eventDate}</td>

                    <td>
                      <span
                        className={`crowd-level ${event.crowdLevel.toLowerCase()}`}
                      >
                        {event.crowdLevel}
                      </span>
                    </td>

                    <td>
                      <span
                        className={`status ${
                          event.status === "Active" ? "active" : "inactive"
                        }`}
                      >
                        {event.status}
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

                        {/* Delete */}

                        <button
                          className="delete-btn"
                          onClick={() => handleDelete(event.id)}
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="no-data">
                    No Events Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ================= EDIT EVENT ================= */}

      <EditEvent
        showEditPopup={showEditPopup}
        setShowEditPopup={setShowEditPopup}
        selectedEvent={selectedEvent}
        events={events}
        setEvents={setEvents}
      />

      {/* ================= DELETE EVENT ================= */}

      {showDeleteModal && (
        <Adddel
          onClose={() => setShowDeleteModal(false)}
          onDelete={confirmDelete}
        />
      )}
    </div>
  );
};

export default AdminEvent;
