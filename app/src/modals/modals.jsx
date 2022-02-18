import React from "react";
import "./modals.scss";

export default function ConfirmationModal(props) {
  const { prompt, cancelAction, confirmAction } = props;

  return (
    <div className="modal">
      <div className="row margin-small">
        <h3>{props.prompt}</h3>
      </div>
      <div className="row margin-small">
        <button className="button modal-button" onClick={cancelAction}>
          Cancel
        </button>
      </div>

      <div className="row margin-small">
        <button className="error-button modal-button" onClick={confirmAction}>
          Confirm
        </button>
      </div>
      <div className="row margin-small"></div>
    </div>
  );
}
