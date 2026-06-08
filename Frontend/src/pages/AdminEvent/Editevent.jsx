import React, { useState, useEffect } from "react";
import "./Editevent.css";

const API_BASE = "http://localhost:8000/api/events";

const Editevent = ({
  showEditPopup,
  setShowEditPopup,
  selectedEvent,
  onEventUpdated,
}) => {
  const [formData, setFormData] = useState({
    id: "",
    eventName: "",
    eventType: "",
    location: "",
    eventDate: "",
    startTime: "",
    endTime: "",
    crowdLevel: "",
    status: "Active",
    description: "",
  });

  const [locations, setLocations] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (selectedEvent) {
      setFormData(selectedEvent);
    }
  }, [selectedEvent]);

  // Fetch locations when popup opens
  useEffect(() => {
    if (showEditPopup) {
      fetch(`${API_BASE}/locations`)
        .then((r) => r.json())
        .then((data) => setLocations(data))
        .catch(() => setLocations([]));
    }
  }, [showEditPopup]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    setSubmitting(true);
    try {
      const res = await fetch(`${API_BASE}/${formData.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const err = await res.json();
        alert(err.detail || "Failed to update event");
        return;
      }

      onEventUpdated?.();
      setShowEditPopup(false);
    } catch (err) {
      alert("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!showEditPopup) return null;

  return (
    <div className="edit-popup-overlay">
      <div className="edit-popup-box">
        <div className="edit-popup-header">
          <h2>Edit Event</h2>

          <button
            className="edit-close-btn"
            onClick={() => setShowEditPopup(false)}
          >
            ×
          </button>
        </div>

        <div className="edit-form-grid">
          <div className="full-width">
            <label>Event Name</label>

            <input
              type="text"
              name="eventName"
              value={formData.eventName}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Event Type</label>

            <select
              name="eventType"
              value={formData.eventType}
              onChange={handleChange}
            >
              <option value="">Select event type</option>
              <option>Music</option>
              <option>Sports</option>
              <option>Festival</option>
              <option>Religious</option>
              <option>National</option>
              <option>Entertainment</option>
              <option>Exhibition</option>
              <option>General</option>
            </select>
          </div>

          <div>
            <label>Location</label>

            <select
              name="location"
              value={formData.location}
              onChange={handleChange}
            >
              <option value="">Select location</option>
              {locations.map((loc) => (
                <option key={loc.id} value={loc.name}>
                  {loc.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>Event Date</label>

            <input
              type="date"
              name="eventDate"
              value={formData.eventDate}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Start Time</label>

            <input
              type="time"
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>End Time</label>

            <input
              type="time"
              name="endTime"
              value={formData.endTime}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Expected Crowd Level</label>

            <select
              name="crowdLevel"
              value={formData.crowdLevel}
              onChange={handleChange}
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
              <option>Very High</option>
            </select>
          </div>

          <div>
            <label>Status</label>

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>

          <div className="full-width">
            <label>Description</label>

            <textarea
              rows="4"
              name="description"
              value={formData.description}
              onChange={handleChange}
            ></textarea>
          </div>
        </div>

        <div className="edit-popup-buttons">
          <button
            className="edit-cancel-btn"
            onClick={() => setShowEditPopup(false)}
          >
            Cancel
          </button>

          <button
            className="edit-update-btn"
            onClick={handleUpdate}
            disabled={submitting}
          >
            {submitting ? "Updating..." : "Update Event"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Editevent;
