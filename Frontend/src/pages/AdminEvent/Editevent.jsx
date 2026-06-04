import React, { useState, useEffect } from "react";
import "./Editevent.css";

const Editevent = ({
  showEditPopup,
  setShowEditPopup,
  selectedEvent,
  events,
  setEvents,
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

  useEffect(() => {
    if (selectedEvent) {
      setFormData(selectedEvent);
    }
  }, [selectedEvent]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = () => {
    const updatedEvents = events.map((event) =>
      event.id === formData.id ? formData : event,
    );

    setEvents(updatedEvents);
    onEventUpdated?.();

    setShowEditPopup(false);
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
              <option>Music</option>
              <option>Sports</option>
              <option>Festival</option>
              <option>Religious</option>
            </select>
          </div>

          <div>
            <label>Location</label>

            <select
              name="location"
              value={formData.location}
              onChange={handleChange}
            >
              <option>Main Hall</option>
              <option>Ground</option>
              <option>Auditorium</option>
              <option>Temple</option>
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

          <button className="edit-update-btn" onClick={handleUpdate}>
            Update Event
          </button>
        </div>
      </div>
    </div>
  );
};

export default Editevent;
