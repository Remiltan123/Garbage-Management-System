
import React, { useState } from "react";
import "./CancelPopup.css";
import { toastError } from "../../Model/toast";

type CancelPopupProps = {
    onClose: () => void;
    onSubmit: (reason: string) => void;
}

export const CancelPopUP = ({onClose, onSubmit }: CancelPopupProps) => {
    const [reason, setReason] = useState("");

    const handleSubmit = () => {
        if (!reason.trim()) {
           toastError("Please enter a reason before submitting.");
            return;
        }
        onSubmit(reason);
    };

    return (
    <div className="cancel-popup-overlay">
      <div className="cancel-popup">
        <h3>Cancel Garbage Collection</h3>
        <p className="cancel-msg">Are you sure you want to cancel this collection?</p>

        <textarea
          className="cancel-textarea"
          placeholder="Enter cancellation reason..."
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />

        <div className="cancel-popup-actions">
          <button className="cancel-submit-btn" onClick={handleSubmit}>
            Submit
          </button>
          <button className="cancel-close-btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}