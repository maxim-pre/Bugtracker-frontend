import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import CreateProjectForm from "../../createProjectFrom";

const CreateProjectModal = ({ show, onClose }) => {
  return (
    <Modal show={show}>
      <Modal.Header>
        <h5 className="modal-title">Create a new Project</h5>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
          onClick={() => onClose()}
        ></button>
      </Modal.Header>
      <Modal.Body>
        <CreateProjectForm />
      </Modal.Body>
    </Modal>
  );
};

export default CreateProjectModal;
