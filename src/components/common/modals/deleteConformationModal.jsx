import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import UpdateProjectForm from "../../updateProjectForm";

const DeleteConformationModal = ({ show, project, onClose, onDelete }) => {
  return (
    <Modal show={show}>
      <Modal.Header>
        <h5 className="modal-title">
          {project === null
            ? "Are you sure you want to delete this project"
            : `Are you sure you want to delete "${project.name} "`}
        </h5>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
          onClick={() => onClose()}
        ></button>
      </Modal.Header>
      <Modal.Body>
        <button className="btn btn-danger" onClick={() => onDelete(project)}>
          Delete
        </button>
        <button className="btn btn-secondary ml-3" onClick={() => onClose()}>
          close
        </button>
      </Modal.Body>
    </Modal>
  );
};

export default DeleteConformationModal;
