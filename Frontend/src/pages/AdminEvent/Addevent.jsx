import React, { useState } from "react";
import "./Addevent.css";

const Addevent = ({ events, setEvents }) => {
  const [showPopup, setShowPopup] = useState(false);

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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddEvent = () => {
    const newEvent = {
      ...formData,
      id: Date.now(),
    };

    setEvents([...events, newEvent]);

    setFormData({
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

    setShowPopup(false);
  };

  return (
    <>
      <button className="add-event-btn" onClick={() => setShowPopup(true)}>
        + Add Event
      </button>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            {/* Header */}
            <div className="popup-header">
              <h2>Add Event</h2>

              <button className="close-btn" onClick={() => setShowPopup(false)}>
                ×
              </button>
            </div>

            {/* Form */}
            <div className="form-grid">
              <div className="full-width">
                <label>Event Name</label>

                <input
                  type="text"
                  name="eventName"
                  placeholder="Enter event name"
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
                  <option value="">Select crowd level</option>
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
                  placeholder="Enter event description"
                  value={formData.description}
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>

            {/* Buttons */}
            <div className="popup-buttons">
              <button
                className="cancel-btn"
                onClick={() => setShowPopup(false)}
              >
                Cancel
              </button>

              <button className="submit-btn" onClick={handleAddEvent}>
                Add Event
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Addevent;
