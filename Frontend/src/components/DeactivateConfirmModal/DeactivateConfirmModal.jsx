import "./DeactivateConfirmModal.css";

function DeactivateConfirmModal({ entityLabel, onClose, onConfirm }) {
  return (
    <div className="modal-overlay">
      <div className="deactivate-modal">
        <h2>Deactivate {entityLabel}</h2>
        <p>
          Are you sure you want to deactivate this {entityLabel.toLowerCase()}? It will
          no longer appear as active until you reactivate it.
        </p>
        <div className="deactivate-modal-buttons">
          <button type="button" className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button type="button" className="deactivate-btn-popup" onClick={onConfirm}>
            Deactivate
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeactivateConfirmModal;
