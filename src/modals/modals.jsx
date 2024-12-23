import React from "react";
import "./modals.scss";

const QRModal = function (props) {
  const { cancelAction, confirmAction } = props;

  return (
    <div className="modal">
      <div className="row margin-small">
        <h1>Scan to join!</h1>
      </div>
      <div className="row margin-small">
        <canvas id="qrcode" className="model-image">
        </canvas>
      </div>

      <div className="row margin-small">
        <button className="button modal-button" onClick={confirmAction}>
          Confirm
        </button>
      </div>
      <div className="row margin-small"></div>
    </div>
  );
};

const ConfirmationModal = function (props) {
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
};

const AlertModal = function (props) {
  const { prompt, confirmAction } = props;

  return (
    <div className="modal">
      <div className="row margin-small">
        <h3>{props.prompt}</h3>
      </div>

      <div className="row margin-small">
        <button className="error-button modal-button" onClick={confirmAction}>
          Confirm
        </button>
      </div>
      <div className="row margin-small"></div>
    </div>
  );
};

export { ConfirmationModal, AlertModal, QRModal};
