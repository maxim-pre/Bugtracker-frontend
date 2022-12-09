import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import AddDeveloperForm from "../../addDeveloperForm";

const DeveloperModal = ({ show, onClose, project_id }) => {
  return (
    <Modal show={show}>
      <Modal.Header>
        <h5 className="modal-title">Add a new team member</h5>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
          onClick={() => onClose()}
        ></button>
      </Modal.Header>
      <Modal.Body>
        <AddDeveloperForm project_id={project_id} />
      </Modal.Body>
    </Modal>
  );
};

export default DeveloperModal;
