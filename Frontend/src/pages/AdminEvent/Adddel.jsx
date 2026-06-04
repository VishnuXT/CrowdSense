import React from "react";
import "./AddDel.css";

const AddDel = ({ onClose, onDelete }) => {
  return (
    <div className="modal-overlay">
      <div className="delete-modal">
        <h2>Delete Event</h2>

        <p>Are you sure you want to delete this event?</p>

        <div className="delete-buttons">
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>

          <button className="delete-btn-popup" onClick={onDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddDel;
