import React from "react";
import "./DeleteLocation.css";

const DeleteLocation = ({ onClose, onDelete }) => {
  return (
    <div className="modal-overlay">
      <div className="delete-modal">
        <h2>Delete Location</h2>

        <p>Are you sure you want to delete this location?</p>

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

export default DeleteLocation;